"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getCurrentUser, logout as serverLogout, type CurrentUser } from "@/auth/actions"

// Define the shape of the auth state and context
interface AuthState {
  user: CurrentUser | null
  isLoading: boolean
  error: string | null
}

interface UseAuthReturn extends AuthState {
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
  isLead: boolean
  isEmployee: boolean
  // Expose userId directly for easy access
  userId: string | null
  role: string | null
  token: string | null
}

const initialAuthState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
}

export function useAuth(): UseAuthReturn {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState)
  const pathname = usePathname()
  const router = useRouter()

  const fetchUserData = useCallback(async () => {
    console.log("useAuth - fetchUserData called")
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const user = await getCurrentUser()
      console.log("useAuth - getCurrentUser returned:", user)
      setAuthState({ user, isLoading: false, error: null })
    } catch (error) {
      console.error("useAuth: Error fetching user data:", error)
      setAuthState({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch user data",
      })
    }
  }, [])

  useEffect(() => {
    console.log("useAuth - useEffect triggered, pathname:", pathname)
    fetchUserData()
  }, [fetchUserData]) // Remove pathname dependency to avoid refetching on every route change

  const handleLogout = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))
    try {
      await serverLogout()
      setAuthState({ user: null, isLoading: false, error: null })
    } catch (error) {
      console.error("useAuth: Logout error:", error)
      setAuthState((prev) => ({
        ...prev,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : "Logout failed",
      }))
    }
  }

  const refreshAuth = useCallback(async () => {
    await fetchUserData()
  }, [fetchUserData])

  // Derived properties
  const isAuthenticated = !!authState.user?.token && !!authState.user?.userId
  const isAdmin = authState.user?.role === "admin"
  const isLead = authState.user?.role === "lead"
  const isEmployee = authState.user?.role === "employee"

  // Debug: Log the current auth state
  console.log("useAuth - Current state:", {
    isAuthenticated,
    userId: authState.user?.userId,
    role: authState.user?.role,
    isLoading: authState.isLoading,
  })

  return {
    ...authState,
    logout: handleLogout,
    refreshAuth,
    isAuthenticated,
    isAdmin,
    isLead,
    isEmployee,
    // Expose individual properties for easy access
    userId: authState.user?.userId || null,
    role: authState.user?.role || null,
    token: authState.user?.token || null,
  }
}
