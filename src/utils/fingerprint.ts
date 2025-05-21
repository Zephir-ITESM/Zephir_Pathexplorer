"use client"

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

// Simple browser fingerprinting
export function useDeviceFingerprint() {
  const [fingerprint, setFingerprint] = useState<string | null>(null)

  useEffect(() => {
    const generateFingerprint = async () => {
      // Collect browser information
      const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const language = navigator.language
      const platform = navigator.platform
      const userAgent = navigator.userAgent

      // Create a simple fingerprint
      const rawFingerprint = `${screenInfo}|${timeZone}|${language}|${platform}|${userAgent}`

      // Hash the fingerprint (in a real app, use a more secure hashing method)
      const encoder = new TextEncoder()
      const data = encoder.encode(rawFingerprint)
      const hashBuffer = await crypto.subtle.digest("SHA-256", data)

      // Convert to hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

      setFingerprint(hashHex)
    }

    generateFingerprint()
  }, [])

  return fingerprint
}

// Function to validate fingerprint on the server
export async function validateFingerprint(token: string, fingerprint: string) {
  try {
    // Decode the JWT to get the stored fingerprint
    const decoded = jwtDecode<{ fingerprint?: string }>(token)

    // If no fingerprint in token, validation passes (backward compatibility)
    if (!decoded.fingerprint) return true

    // Compare fingerprints
    return decoded.fingerprint === fingerprint
  } catch (error) {
    console.error("Fingerprint validation error:", error)
    return false
  }
}
