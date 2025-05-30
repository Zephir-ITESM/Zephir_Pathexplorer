"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation" // useRouter for redirecting after logout
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
  // You can add more specific role checks if needed
  isAuthReady: boolean
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
  const router = useRouter() // For redirecting after logout

  const fetchUserData = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const user = await getCurrentUser() // Call the server action
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
    fetchUserData()
  }, [fetchUserData, pathname]) // Re-fetch on pathname change if session might change with route

  const handleLogout = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))
    try {
      await serverLogout() // Call the server action for logout
      setAuthState({ user: null, isLoading: false, error: null })
      // The server action already handles redirect, but you could also do it here if needed
      // router.push('/login');
    } catch (error) {
      console.error("useAuth: Logout error:", error)
      // Even if logout action fails, clear local state
      setAuthState((prev) => ({
        ...prev,
        user: null, // Ensure user is cleared locally
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
  const isAuthReady = !authState.isLoading

  // Expose userId, role, token directly
  const userId = authState.user?.userId || null
  const role = authState.user?.role || null
  const token = authState.user?.token || null

  return {
    ...authState,
    logout: handleLogout,
    refreshAuth,
    isAuthenticated,
    isAdmin,
    isLead,
    isEmployee,
    isAuthReady,
    userId,
    role,
    token,
  }
}
