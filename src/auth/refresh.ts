"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { refreshUserToken } from "@/services/api"

export async function refreshToken() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("refresh_token")?.value
    const sessionId = cookieStore.get("session_id")?.value

    if (!refreshToken) {
      // No refresh token, redirect to login
      redirect("/login?session=expired")
    }

    // Call API to get new tokens
    const response = await refreshUserToken(refreshToken)

    if (!response || !response.token) {
      // Invalid refresh token or other error
      // Clear all auth cookies
      cookieStore.delete("auth_token")
      cookieStore.delete("refresh_token")
      cookieStore.delete("user_type")
      cookieStore.delete("user_id")
      cookieStore.delete("session_id")

      redirect("/login?session=expired")
    }

    // Update the access token
    cookieStore.set("auth_token", response.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    })

    // Optionally update the refresh token if the API returns a new one
    if (response.refreshToken) {
      cookieStore.set("refresh_token", response.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })
    }

    return { success: true, sessionId }
  } catch (error) {
    console.error("Token refresh error:", error)
    return { success: false, sessionId: null }
  }
}
