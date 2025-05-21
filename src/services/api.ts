"use server"

import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo: email, contraseña: password }),
      cache: "no-store",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Error de autenticación")
    }

    return await response.json()
  } catch (error: any) {
    console.error("API login error:", error)
    throw new Error(error.message || "Error de conexión")
  }
}

export async function refreshUserToken(refreshToken: string) {
  try {
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Error al refrescar el token")
    }

    return await response.json()
  } catch (error: any) {
    console.error("API refresh token error:", error)
    throw new Error(error.message || "Error de conexión")
  }
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  if (!token) {
    throw new Error("No authentication token")
  }

  const headers = new Headers(options.headers || {})
  headers.set("Authorization", `Bearer ${token}`)
  headers.set("Content-Type", "application/json")

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      cache: "no-store",
    })

    if (response.status === 401) {
      // Token expired, try to refresh
      // This would be handled by middleware in a real app
      throw new Error("Authentication token expired")
    }

    return response
  } catch (error) {
    console.error("Fetch with auth error:", error)
    throw error
  }
}
