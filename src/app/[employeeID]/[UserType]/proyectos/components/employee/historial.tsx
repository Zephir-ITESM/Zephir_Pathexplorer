"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { PageHeader } from "@/components/ui/header"

interface ProjectHistory {
  id: string
  company: string
  name: string
  leader: string
  collaborators: number
  startDate: string
  endDate: string
  role?: string
}

export default function HistorialUser() {
  const router = useRouter()
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [projectHistory, setProjectHistory] = useState<ProjectHistory[]>([
    {
      id: "1",
      company: "TechCorp",
      name: "Project Phoenix",
      leader: "Albert Flores",
      collaborators: 15,
      startDate: "01/01/2023",
      endDate: "31/12/2023",
      role: "Frontend Developer",
    },
    {
      id: "2",
      company: "Innova Solutions",
      name: "Operation Horizon",
      leader: "Jenny Wilson",
      collaborators: 12,
      startDate: "15/02/2023",
      endDate: "15/08/2023",
      role: "Full Stack Developer",
    },
    {
      id: "3",
      company: "GreenTech",
      name: "Initiative Cascade",
      leader: "Savannah Nguyen",
      collaborators: 18,
      startDate: "01/03/2023",
      endDate: "30/11/2023",
      role: "Backend Developer",
    },
    {
      id: "4",
      company: "ByteWorks",
      name: "Mission Apex",
      leader: "Courtney Henry",
      collaborators: 14,
      startDate: "10/04/2023",
      endDate: "10/10/2023",
      role: "DevOps Engineer",
    },
    {
      id: "5",
      company: "Creative Minds",
      name: "Venture Summit",
      leader: "Esther Howard",
      collaborators: 19,
      startDate: "20/05/2023",
      endDate: "20/12/2023",
      role: "UI/UX Designer",
    },
  ])

  // Toggle row expansion
  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  // Column definitions for the data table
  const columns = [
    {
      accessorKey: "company",
      header: "Empresa",
      size: 1.5,
    },
    {
      accessorKey: "name",
      header: "Nombre de proyecto",
      size: 2,
    },
    {
      accessorKey: "leader",
      header: "Líder de proyecto",
      size: 1.5,
    },
    {
      accessorKey: "collaborators",
      header: "N. de Colaboradores",
      size: 1,
    },
    {
      accessorKey: "startDate",
      header: "Inicio",
      size: 1,
    },
    {
      accessorKey: "endDate",
      header: "Fin",
      size: 1,
    },
    {
      accessorKey: "role",
      header: "Mi rol",
      size: 1.5,
    },
  ]

  // Add expandable configuration
  const expandableConfig = {
    isExpandable: (row: ProjectHistory) => true,
    content: (row: ProjectHistory) => (
      <div className="p-4">
        <h3 className="font-medium mb-2">Descripción</h3>
        <p className="text-[#888888]">
          Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.
        </p>
        {row.role && (
          <div className="mt-3">
            <h3 className="font-medium mb-2">Mi contribución</h3>
            <p className="text-[#888888]">
              Como {row.role}, trabajé en el desarrollo de componentes clave y la implementación de nuevas
              funcionalidades siguiendo las mejores prácticas de desarrollo.
            </p>
          </div>
        )}
      </div>
    ),
  }

  return (
    <div className="w-full">
      <PageHeader
        title="Historial de Proyectos"
        breadcrumbs={[
          { label: "Proyectos", href: "../proyectos" },
          { label: "Historial", href: "./proyectos/historial" },
        ]}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          
        </div>
      </div>
    </div>
  )
}
