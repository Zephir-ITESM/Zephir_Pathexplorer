"use client"

import { useSecureFetch } from "@/utils/secure-fetch"
import { useDeviceFingerprint } from "@/utils/fingerprint"
import { useEffect, useState } from "react"

export function useSecureClient() {
  const { secureFetch, isRefreshing } = useSecureFetch()
  const fingerprint = useDeviceFingerprint()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (fingerprint) {
      setIsReady(true)
    }
  }, [fingerprint])

  const secureRequest = async (url: string, options: RequestInit = {}) => {
    if (!fingerprint) {
      throw new Error("Device fingerprint not available")
    }

    // Add fingerprint to headers
    const headers = new Headers(options.headers || {})
    headers.set("X-Device-Fingerprint", fingerprint)

    return secureFetch(url, {
      ...options,
      headers,
    })
  }

  return { secureRequest, isRefreshing, isReady }
}
