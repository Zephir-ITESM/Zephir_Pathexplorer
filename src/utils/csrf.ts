"use client"

import { useEffect, useState } from "react"

export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null)

  useEffect(() => {
    // Get the session ID from the cookie
    const cookies = document.cookie.split(";")
    const sessionCookie = cookies.find((cookie) => cookie.trim().startsWith("session_id="))
    const sessionId = sessionCookie ? sessionCookie.split("=")[1] : null

    if (sessionId) {
      // Generate a CSRF token based on the session ID
      const timestamp = Date.now().toString()
      const token = btoa(`${sessionId}:${timestamp}`)
      setCsrfToken(token)
    }
  }, [])

  return csrfToken
}
