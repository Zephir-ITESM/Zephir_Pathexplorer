"use client"

import { useState } from "react"

import { HistorialView } from "./components/historial"
import { ProgresosView } from "./components/progresos"
import { CertificacionesView } from "./components/certificaciones"

// Tab menu items
const tabs = [
  { id: "historial", label: "Historial", icon: "icon-medal" },
  { id: "progresos", label: "Progresos", icon: "icon-book" },
  { id: "certificaciones", label: "Certificaciones", icon: "icon-checklist" },
]

export default function EducacionPage() {
  const [activeTab, setActiveTab] = useState("historial")

  return (
    <div className="min-h-screen">
      

      <div className="container mx-auto px-4 py-6">
        {activeTab === "historial" && <HistorialView />}
        {activeTab === "progresos" && <ProgresosView />}
        {activeTab === "certificaciones" && <CertificacionesView />}
      </div>
    </div>
  )
}
