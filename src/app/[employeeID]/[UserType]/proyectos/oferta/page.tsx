"use client"

import { useState } from "react"

import { ProyectosTab, AplicacionesTab } from "./components"

// Tab menu items
const tabs = [
  { id: "proyectos", label: "Sugerencias", icon: "icon-medal" },
  { id: "aplicaciones", label: "Invitaciones", icon: "icon-sms-star" },
]

export default function OfertaPage() {
  const [activeTab, setActiveTab] = useState("proyectos")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen">
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === "proyectos" && <ProyectosTab searchTerm={searchTerm} />}
          {activeTab === "aplicaciones" && <AplicacionesTab searchTerm={searchTerm} />}
        </div>
      </div>
    </div>
  )
}
