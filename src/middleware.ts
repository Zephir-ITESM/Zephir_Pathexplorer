import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

// In-memory store for rate limiting (in production, use Redis or similar)
const ipRequestCounts: Record<string, { count: number; timestamp: number }> = {}

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60 // 60 requests per minute

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Apply rate limiting to authentication endpoints
  if (path.startsWith("/api/auth") || path === "/" || path.startsWith("/auth")) {
    // Get client IP
    // Try to get the client IP from the x-forwarded-for header or fallback to "unknown"
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"

    // Get current timestamp
    const now = Date.now()

    // Initialize or reset counter if window has passed
    if (!ipRequestCounts[ip] || now - ipRequestCounts[ip].timestamp > RATE_LIMIT_WINDOW) {
      ipRequestCounts[ip] = { count: 1, timestamp: now }
    } else {
      // Increment counter
      ipRequestCounts[ip].count++
    }

    // Check if rate limit exceeded
    if (ipRequestCounts[ip].count > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 })
    }
  }

  // Original authentication and routing logic
  const authToken = request.cookies.get("auth_token")?.value
  const userId = request.cookies.get("user_id")?.value

  const isRootPath = path === "/"
  const isAuthRoute = path.startsWith("/auth")

  // Check if the token is expired
  let isTokenExpired = false
  let decodedToken: any = null

  if (authToken) {
    try {
      decodedToken = jwtDecode<{
        exp: number
      }>(authToken)

      const currentTime = Math.floor(Date.now() / 1000)
      isTokenExpired = decodedToken.exp < currentTime
    } catch (error) {
      console.error("middleware: Error decoding token:", error)
      isTokenExpired = true
    }
  }

  // If the token is expired, delete cookies and redirect to login page
  if (authToken && isTokenExpired) {
    const response = NextResponse.redirect(new URL("/?invalidToken=true", request.url))
    response.cookies.delete("auth_token")
    response.cookies.delete("user_id")
    response.cookies.delete("refresh_token") // Also delete refresh token
    response.cookies.delete("user_type") // Also delete user type
    response.cookies.delete("session_id") // Also delete session ID
    return response
  }

  // Unauthenticated users can only access root and auth routes
  if (!authToken) {
    if (isRootPath || isAuthRoute) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/", request.url))
  }

  // For authenticated users
  if (isRootPath || isAuthRoute) {
    // Ensure we have a userId to redirect to
    if (!userId) {
      // If userId is missing, clear all cookies and stay on login
      const response = NextResponse.redirect(new URL("/", request.url))
      response.cookies.delete("auth_token")
      response.cookies.delete("user_id")
      response.cookies.delete("refresh_token")
      response.cookies.delete("user_type")
      response.cookies.delete("session_id")
      return response
    }

    // Redirect all authenticated users to their dashboard
    return NextResponse.redirect(new URL(`/${userId}/dashboard`, request.url))
  }

  // If user is not already in their own dashboard area, redirect them
  if (userId && !path.startsWith(`/${userId}/`)) {
    return NextResponse.redirect(new URL(`/${userId}/dashboard`, request.url))
  }

  return NextResponse.next()
}

// Update the matcher to include API routes for rate limiting
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
}
