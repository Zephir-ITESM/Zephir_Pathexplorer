"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/auth/useAuth"
import ProyectosLead from "./components/lead/proyectos"
import ProyectosEmployee from "./components/employee/proyectos"

export default function ProyectosPage() {
  const params = useParams()
  const { role, isLoading } = useAuth()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    // First try to get the user type from the URL params
    if (params.UserType) {
      setUserType(params.UserType as string)
    }
    // If not available in URL, use the role from auth context
    else if (role) {
      setUserType(role)
    }
  }, [params.UserType, role])

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
      {userType === "lead" && <ProyectosLead />}
      {userType === "employee" && <ProyectosEmployee />}
      {!userType && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se pudo determinar el tipo de usuario.</p>
        </div>
      )}
    </>
  )
}
