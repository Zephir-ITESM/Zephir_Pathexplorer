"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/header"

interface ProjectHistory {
  id: string
  company: string
  name: string
  collaborators: number
  startDate: string
  endDate: string
}

export default function HistorialLead() {
  const router = useRouter()
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [projectHistory, setProjectHistory] = useState<ProjectHistory[]>([
    {
      id: "1",
      company: "Acme Corp",
      name: "Project Phoenix",
      collaborators: 5,
      startDate: "2023-01-15",
      endDate: "2023-06-30",
    },
    {
      id: "2",
      company: "Beta Industries",
      name: "Operation Blue Sky",
      collaborators: 8,
      startDate: "2023-03-01",
      endDate: "2023-08-15",
    },
    {
      id: "3",
      company: "Gamma Solutions",
      name: "Project Nightingale",
      collaborators: 3,
      startDate: "2023-05-10",
      endDate: "2023-10-31",
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
      accessorKey: "collaborators",
      header: "N. de Colaboradores",
      size: 1.5,
    },
    {
      accessorKey: "startDate",
      header: "Inicio",
      size: 1.5,
    },
    {
      accessorKey: "endDate",
      header: "Fin",
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
      </div>
    ),
  }

  return (
    <div className="w-full">
      <PageHeader
        title="Historial de Proyectos"
        breadcrumbs={[
          { label: "Proyectos", href: "/proyectos" },
          { label: "Historial", href: "/proyectos/historial" },
        ]}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <DataTable
            data={projectHistory}
            columns={columns}
            expandable={expandableConfig}
            pagination={{
              pageIndex: 0,
              pageSize: 10,
              pageCount: Math.ceil(projectHistory.length / 10),
              onPageChange: () => {},
            }}
          />
        </div>
      </div>
    </div>
  )
}
