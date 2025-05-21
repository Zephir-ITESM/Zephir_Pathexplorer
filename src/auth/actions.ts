"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginUser } from "@/services/api"
import { jwtDecode } from "jwt-decode"
import { mapRoleIdToName } from "./utils"
import { v4 as uuidv4 } from "uuid"

export type CurrentUser = {
  userId: string | null
  role: string | null
  token: string | null
}

export async function getCurrentUser(): Promise<CurrentUser> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    const userId = cookieStore.get("user_id")?.value
    const userType = cookieStore.get("user_type")?.value

    if (token) {
      try {
        // Verify token is not expired
        const decoded = jwtDecode<{ exp: number }>(token)
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          // Token expired, clear cookies and redirect to login
          cookieStore.delete("auth_token")
          cookieStore.delete("refresh_token")
          cookieStore.delete("user_type")
          cookieStore.delete("user_id")
          cookieStore.delete("session_id")
          redirect("/login?session=expired")
        }
      } catch (error) {
        // Invalid token, clear cookies
        cookieStore.delete("auth_token")
        cookieStore.delete("refresh_token")
        cookieStore.delete("user_type")
        cookieStore.delete("user_id")
        cookieStore.delete("session_id")
        redirect("/login?invalidToken=true")
      }
    }

    return {
      userId: userId ?? null,
      role: userType ?? null,
      token: token ?? null,
    }
  } catch (error) {
    console.error("Error in getCurrentUser:", error)
    return { userId: null, role: null, token: null }
  }
}

export async function login(prevState: any, formData: FormData) {
  const correo = formData.get("email") as string
  const contraseña = formData.get("password") as string
  const rememberMe = formData.get("remember-me") === "on"

  // Validate input
  if (!correo || !contraseña) {
    return {
      success: false,
      message: "Correo y contraseña son requeridos",
    }
  }

  try {
    // Use the API service instead of direct fetch
    const data = await loginUser(correo, contraseña)

    // Check if we have the expected data structure
    if (!data || !data.token || !data.user) {
      console.error("auth/actions: Unexpected API response:", data)
      return {
        success: false,
        message: "Respuesta inesperada del servidor",
      }
    }

    // Determine the user role - either use tipo_usuario from API or map from id_tipo_usuario
    let userRole = data.user.tipo_usuario
    if (!userRole && data.user.id_tipo_usuario) {
      userRole = mapRoleIdToName(data.user.id_tipo_usuario)
    }

    // Set the token in cookies
    const cookieStore = await cookies()

    // Calculate expiry if remember me is checked (30 days in seconds for refresh token)
    const accessTokenMaxAge = 15 * 60 // 15 minutes
    const refreshTokenMaxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 1 day

    // Generate a unique session ID
    const sessionId = uuidv4()

    // Set the access token with short expiry
    cookieStore.set("auth_token", data.token, {
      httpOnly: true,
      secure: true, // Always use secure in production and development
      sameSite: "strict", // Stronger CSRF protection
      path: "/",
      maxAge: accessTokenMaxAge,
    })

    // Set the refresh token with longer expiry
    cookieStore.set("refresh_token", data.refreshToken || data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: refreshTokenMaxAge,
    })

    // Store user type in a separate cookie
    cookieStore.set("user_type", userRole, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: refreshTokenMaxAge,
    })

    // Store user ID in a separate cookie
    cookieStore.set("user_id", data.user.id_usuario, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: refreshTokenMaxAge,
    })

    // Store session ID for CSRF protection
    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: refreshTokenMaxAge,
    })

    // Correctly redirect to dashboard without including UserType in the URL
    const redirectTo = `/${data.user.id_usuario}/dashboard`

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      redirectTo,
      sessionId,
    }
  } catch (error: any) {
    console.error("Login error:", error)
    return {
      success: false,
      message: error.message || "Error de conexión. Intente nuevamente.",
    }
  }
}

export async function logout() {
  const cookieStore = await cookies()

  // Get the refresh token before deleting cookies
  const refreshToken = cookieStore.get("refresh_token")?.value

  // Clear all auth cookies
  cookieStore.delete("auth_token")
  cookieStore.delete("refresh_token")
  cookieStore.delete("user_type")
  cookieStore.delete("user_id")
  cookieStore.delete("session_id")

  // Invalidate the session on the server if we have a refresh token
  if (refreshToken) {
    try {
      // Call your API to invalidate the token on the server side
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })
    } catch (error) {
      console.error("Logout error:", error)
      // Continue with logout even if server-side invalidation fails
    }
  }

  redirect("/")
}
