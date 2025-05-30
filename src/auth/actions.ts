"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"

// Define the CurrentUser type based on what you store in cookies
export type CurrentUser = {
  userId: string | null
  role: string | null
  token: string | null
}

export async function supabaseLogin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      message: "Email y contraseña son requeridos",
      redirectTo: "",
      sessionId: "",
    }
  }

  try {
    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        message: error.message === "Invalid login credentials" ? "Credenciales inválidas" : "Error de autenticación",
        redirectTo: "",
        sessionId: "",
      }
    }

    if (!data.session || !data.user) {
      return {
        success: false,
        message: "Error al crear la sesión",
        redirectTo: "",
        sessionId: "",
      }
    }

    // Debug: Log the Supabase user data
    console.log("Supabase user data:", {
      id: data.user.id,
      email: data.user.email,
    })

    // Fetch user profile from your backend
    let userProfileData = null
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    // Debug: Log the API URL
    console.log("API URL for profile fetch:", apiUrl)

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined!")
    }

    try {
      const profileResponse = await fetch(`${apiUrl || "http://localhost:3001"}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
          "Content-Type": "application/json",
        },
      })

      // Debug: Log the profile response status
      console.log("Profile response status:", profileResponse.status)

      if (profileResponse.ok) {
        userProfileData = await profileResponse.json()
        // Debug: Log the profile data
        console.log("User profile data:", userProfileData)
      } else {
        console.error(
          "Failed to fetch user profile from backend:",
          profileResponse.status,
          await profileResponse.text(),
        )
      }
    } catch (profileError) {
      console.error("Error fetching user profile from backend:", profileError)
    }

    // Set cookies
    const cookieStore = await cookies()
    const sevenDays = 60 * 60 * 24 * 7
    const thirtyDays = 60 * 60 * 24 * 30

    cookieStore.set("auth_token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: sevenDays,
      path: "/",
    })

    cookieStore.set("refresh_token", data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: thirtyDays,
      path: "/",
    })

    // IMPORTANT: Ensure we have a valid user ID
    // First try to get it from the profile data
    let userId = null
    if (userProfileData && userProfileData.id_usuario) {
      userId = userProfileData.id_usuario.toString()
      console.log("Using id_usuario from profile:", userId)
    } else if (userProfileData && userProfileData.auth_user_id) {
      // Fallback to auth_user_id if available
      userId = userProfileData.auth_user_id
      console.log("Using auth_user_id from profile:", userId)
    } else {
      // Last resort: use the Supabase user ID
      userId = data.user.id
      console.log("Using Supabase user ID as fallback:", userId)
    }

    // Ensure we have a user type/role
    let userType = null
    if (userProfileData && userProfileData.id_tipo_usuario) {
      userType = userProfileData.id_tipo_usuario.toString()
    } else {
      // Default to a standard user type if not available
      userType = "2" // Assuming 2 is a standard user/employee
    }

    // Set user ID and type cookies
    cookieStore.set("user_id", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: sevenDays,
      path: "/",
    })

    cookieStore.set("user_type", userType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: sevenDays,
      path: "/",
    })

    // Generate session ID for CSRF protection
    const sessionId = crypto.randomUUID()
    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: sevenDays,
      path: "/",
    })

    // Determine redirect path based on user type
    const isAdmin = userType === "1" // Assuming 1 is admin
    const redirectPath = isAdmin ? `/${userId}/admin/dashboard` : `/${userId}/dashboard`

    // Debug: Log the final redirect path
    console.log("Redirecting to:", redirectPath)

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      redirectTo: redirectPath,
      sessionId,
    }
  } catch (error: any) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "Error de conexión",
      redirectTo: "",
      sessionId: "",
    }
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (token) {
      // Optionally tell the backend to invalidate the session
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch (e) {
        console.error("Error calling logout endpoint:", e)
        // Continue with logout even if the API call fails
      }
    }
  } catch (e) {
    console.error("Error during logout:", e)
  } finally {
    // Clear all cookies
    const cookieStore = await cookies()
    cookieStore.delete("auth_token")
    cookieStore.delete("refresh_token")
    cookieStore.delete("user_id")
    cookieStore.delete("user_type")
    cookieStore.delete("session_id")
    redirect("/login")
  }
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies()

    const authToken = cookieStore.get("auth_token")?.value
    const userId = cookieStore.get("user_id")?.value
    const userType = cookieStore.get("user_type")?.value

    // Debug: Log what we're getting from cookies
    console.log("getCurrentUser - Cookies:", {
      authToken: authToken ? "present" : "missing",
      userId: userId || "missing",
      userType: userType || "missing",
    })

    if (!authToken || !userId) {
      console.log("getCurrentUser - Missing auth token or user ID, returning null")
      return null
    }

    // Map user_type to role
    let role: string | null = null
    if (userType) {
      switch (userType) {
        case "1":
          role = "admin"
          break
        case "2":
          role = "employee"
          break
        case "3":
          role = "lead"
          break
        default:
          role = "unknown"
      }
    }

    const currentUser = {
      userId,
      role,
      token: authToken,
    }

    // Debug: Log what we're returning
    console.log("getCurrentUser - Returning:", currentUser)

    return currentUser
  } catch (error) {
    console.error("getCurrentUser - Error:", error)
    return null
  }
}
