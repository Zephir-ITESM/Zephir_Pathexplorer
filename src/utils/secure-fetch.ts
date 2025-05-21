"use client"

import { useCsrfToken } from "./csrf"
import { useAuthRefresh } from "@/hooks/use-auth-refresh"

export function useSecureFetch() {
  const csrfToken = useCsrfToken()
  const { handleRefresh, isRefreshing } = useAuthRefresh()

  const secureFetch = async (url: string, options: RequestInit = {}) => {
    if (!csrfToken) {
      throw new Error("CSRF token not available")
    }

    // Add CSRF token to headers
    const headers = new Headers(options.headers || {})
    headers.set("X-CSRF-Token", csrfToken)
    headers.set("Content-Type", "application/json")

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include", // Include cookies
      })

      // If unauthorized, try to refresh the token
      if (response.status === 401) {
        const refreshed = await handleRefresh()

        if (refreshed) {
          // Retry the request with the new token
          return fetch(url, {
            ...options,
            headers,
            credentials: "include",
          })
        } else {
          throw new Error("Authentication failed")
        }
      }

      return response
    } catch (error) {
      console.error("Secure fetch error:", error)
      throw error
    }
  }

  return { secureFetch, isRefreshing }
}
