import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode"

export async function POST(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify the token is valid
    try {
      const decoded = jwtDecode<{ exp: number }>(token)
      // Check if token is expired
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return NextResponse.json({ error: "Token expired" }, { status: 401 })
      }
    } catch (e) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Verify CSRF token
    const csrfToken = request.headers.get("X-CSRF-Token")
    const sessionId = cookieStore.get("session_id")?.value

    if (!csrfToken || !sessionId) {
      return NextResponse.json({ error: "CSRF verification failed" }, { status: 403 })
    }

    // Decode the CSRF token and verify it contains the correct session ID
    try {
      const decodedCsrf = atob(csrfToken)
      const [tokenSessionId] = decodedCsrf.split(":")

      if (tokenSessionId !== sessionId) {
        return NextResponse.json({ error: "CSRF verification failed" }, { status: 403 })
      }
    } catch (e) {
      return NextResponse.json({ error: "CSRF verification failed" }, { status: 403 })
    }

    // If we get here, the request is authenticated and CSRF-protected
    // Process the request...
    const body = await request.json()

    // Return the response
    return NextResponse.json({ success: true, data: body })
  } catch (error) {
    console.error("Protected API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
