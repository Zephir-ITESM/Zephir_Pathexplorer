"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/auth/useAuth"
import HistorialLead from "../components/lead/historial"
import HistorialUser from "../components/employee/historial"

export default function HistorialPage() {
  const params = useParams()
  const { role, isLoading } = useAuth()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {

    // First try to get the user type from the URL params
    if (params.UserType) {
      const paramType = params.UserType as string
      setUserType(paramType.toLowerCase()) // Normalize to lowercase
    }
    // If not available in URL, use the role from auth context
    else if (role) {
      setUserType(role.toLowerCase()) // Normalize to lowercase
    }
  }, [params, role])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accenture-purple"></div>
      </div>
    )
  }

  // Render the appropriate component based on user type
  return (
    <>
      {userType === "lead" && (
        <>
          <HistorialLead />
        </>
      )}
      {userType === "employee" && (
        <>
          <HistorialUser />
        </>
      )}
      {!userType && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se pudo determinar el tipo de usuario.</p>
        </div>
      )}
    </>
  )
}
