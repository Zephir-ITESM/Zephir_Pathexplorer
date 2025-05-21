"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { refreshToken } from "@/auth/refresh"

export function useAuthRefresh() {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Function to handle token refresh
  const handleRefresh = async () => {
    if (isRefreshing) return

    setIsRefreshing(true)
    const result = await refreshToken()
    setIsRefreshing(false)

    if (!result.success) {
      router.push("/login?session=expired")
    }

    return result.success
  }

  // Set up automatic refresh before token expiration
  useEffect(() => {
    // Refresh 1 minute before the token expires (14 minutes after setting)
    const refreshInterval = setInterval(
      () => {
        handleRefresh()
      },
      14 * 60 * 1000,
    )

    return () => clearInterval(refreshInterval)
  }, [])

  return { handleRefresh, isRefreshing }
}
