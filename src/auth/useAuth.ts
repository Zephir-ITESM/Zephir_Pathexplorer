"use client"

import { useState, useEffect } from "react"
import { getCurrentUser, logout, type CurrentUser } from "@/auth/actions"
import { usePathname } from "next/navigation"

export function useAuth() {
  const [authState, setAuthState] = useState<{
    userData: CurrentUser
    isLoading: boolean
    error: string | null
  }>({
    userData: { userId: null, role: null, token: null },
    isLoading: true,
    error: null,
  })

  const pathname = usePathname()

  // Function to fetch the current user data
  const fetchUserData = async () => {
    try {
      const data = await getCurrentUser()

      setAuthState({
        userData: data,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      console.error("useAuth: Error fetching user data:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch user data",
      }))
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout()
      setAuthState({
        userData: { userId: null, role: null, token: null },
        isLoading: false,
        error: null,
      })
    } catch (error) {
      console.error("useAuth: Logout error:", error)
    }
  }

  // Refresh auth state
  const refreshAuth = () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))
    fetchUserData()
  }

  // Extract userId from the pathname (first part after /)
  const pathParts = pathname.split("/").filter((part) => part !== "")
  const userIdFromPath = pathParts[0] || null

  // Just get the role from the auth state, don't try to extract from URL
  // as the URL structure varies depending on the route

  // Derived properties
  const isAuthenticated = !!authState.userData.token
  const isAdmin = authState.userData.role === "admin"
  const isLead = authState.userData.role === "lead"
  const isEmployee = authState.userData.role === "employee"

  return {
    // User data
    userId: userIdFromPath || authState.userData.userId,
    role: authState.userData.role,
    token: authState.userData.token,

    // Status
    isLoading: authState.isLoading,
    error: authState.error,

    // Derived properties
    isAuthenticated,
    isAdmin,
    isLead,
    isEmployee,

    // Actions
    logout: handleLogout,
    refreshAuth,
  }
}
