"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { useAuth } from "@/auth/useAuth"

export default function SettingsPage() {
  const router = useRouter()
  const params = useParams()
  const { token } = useAuth()
  const [isCreating, setIsCreating] = useState(false)

  // Function to create a user with hardcoded values
  const createUser = async () => {
    setIsCreating(true)

    try {
      // Make a direct API call to create a user
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: "Juan Pérez",
          email: "juan.perez@accenture.com",
          role: "employee",
          department: "Technology",
          position: "Software Engineer",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create user")
      }

      const data = await response.json()
      alert(`Usuario creado: ${data.name || "Juan Pérez"}`)

      // Refresh the page
      router.refresh()
    } catch (error) {
      console.error("Error creating user:", error)
      alert("Error al crear usuario")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Administración de Usuarios</h2>
        <p className="text-gray-600 mb-4">Crea un nuevo usuario con valores predeterminados para pruebas.</p>

        <button
          onClick={createUser}
          disabled={isCreating}
          className={`px-4 py-2 rounded-md bg-accenture-purple text-white hover:bg-accenture-purple/90 transition-colors ${isCreating ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isCreating ? "Creando usuario..." : "Crear Usuario de Prueba"}
        </button>
      </div>
    </div>
  )
}
