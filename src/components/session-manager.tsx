"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthRefresh } from "@/hooks/use-auth-refresh"
import { logout } from "@/auth/actions"

export default function SessionManager() {
  const router = useRouter()
  const { handleRefresh } = useAuthRefresh()
  const [sessionTimeLeft, setSessionTimeLeft] = useState<number | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  // Only run on client side
  if (typeof window === "undefined") {
    return null
  }

  // Check session status every minute
  useEffect(() => {
    const checkSession = async () => {
      // Get the auth token expiry from cookie (this is a simplified approach)
      const cookies = document.cookie.split(";")
      const authCookie = cookies.find((cookie) => cookie.trim().startsWith("auth_token="))

      if (!authCookie) {
        // No auth token, redirect to login
        router.push("/login")
        return
      }

      // Calculate time left in session (simplified)
      // In a real implementation, you'd decode the JWT and check its expiration
      const now = Date.now()
      const expiryTime = now + 15 * 60 * 1000 // Assuming 15 min token
      const timeLeft = Math.floor((expiryTime - now) / 1000)

      setSessionTimeLeft(timeLeft)

      // Show warning when less than 2 minutes left
      if (timeLeft < 120 && timeLeft > 0) {
        setShowWarning(true)
      } else {
        setShowWarning(false)
      }
    }

    // Check immediately and then every 30 seconds
    checkSession()
    const interval = setInterval(checkSession, 30000)

    return () => clearInterval(interval)
  }, [router])

  const extendSession = async () => {
    await handleRefresh()
    setShowWarning(false)
  }

  const endSession = async () => {
    await logout()
  }

  if (!showWarning) return null

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 p-4 rounded-md shadow-lg z-50">
      <h3 className="font-medium text-yellow-800">Tu sesión está por expirar</h3>
      <p className="text-sm text-yellow-700 mt-1">
        Tu sesión expirará en aproximadamente {Math.floor(sessionTimeLeft! / 60)}:
        {(sessionTimeLeft! % 60).toString().padStart(2, "0")} minutos.
      </p>
      <div className="mt-3 flex space-x-3">
        <button onClick={extendSession} className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
          Extender sesión
        </button>
        <button onClick={endSession} className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300">
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
