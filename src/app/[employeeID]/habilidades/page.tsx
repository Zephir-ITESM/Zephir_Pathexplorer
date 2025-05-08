"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/header"
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
      <PageHeader
        title="Educación"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Educación", href: "/educacion" },
        ]}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        actions={[
          {
            label: "Nueva Educación",
            icon: "icon-plus",
            variant: "purple",
            onClick: () => alert("Agregar nueva certificación"),
          },
        ]}
      />

      <div className="container mx-auto px-4 py-6">
        {activeTab === "historial" && <HistorialView />}
        {activeTab === "progresos" && <ProgresosView />}
        {activeTab === "certificaciones" && <CertificacionesView />}
      </div>
    </div>
  )
}
