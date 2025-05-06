"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/auth/useAuth"
import CarreraDashboard from "./components/page"

export default function CarreraDashboardPage() {
  const router = useRouter()
  const { userId, token } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [hasCompletedForm, setHasCompletedForm] = useState(false)

  useEffect(() => {
    async function checkFormCompletion() {
      try {
        // Replace with your actual API call to check form completion
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/carrera/form-status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          // The API just returns a boolean value
          const completed = true
          setHasCompletedForm(completed)
        } else {
          // If there's an error or the form doesn't exist, assume it's not completed
          setHasCompletedForm(true)
        }
      } catch (error) {
        console.error("Error checking form completion:", error)
        setHasCompletedForm(true)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }

    if (userId && token) {
      checkFormCompletion()
    }
  }, [userId, token])

  useEffect(() => {
    // Redirect to form if not completed and not already loading
    if (!isLoading && !hasCompletedForm) {
      router.push(`/${userId}/carrera/form`)
    }
  }, [isLoading, hasCompletedForm, router, userId])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accenture-purple"></div>
      </div>
    )
  }

  // This will only render if the form has been completed
  return (
    <CarreraDashboard/>
  )
}
