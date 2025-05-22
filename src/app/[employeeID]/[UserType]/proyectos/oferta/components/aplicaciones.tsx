"use client"

import { useState } from "react"


interface Application {
  id: string
  company: string
  projectName: string
  role: string
  applyDate: string
  status: "Pendiente" | "Aceptada" | "Rechazada"
}

interface AplicacionesTabProps {
  searchTerm: string
}

export default function AplicacionesTab({ searchTerm }: AplicacionesTabProps) {
  // Mock data for applications
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      company: "TechCorp",
      projectName: "Project Phoenix",
      role: "Desarrollador",
      applyDate: "15/03/2023",
      status: "Pendiente",
    },
    {
      id: "2",
      company: "Innova Solutions",
      projectName: "Operation Horizon",
      role: "Diseñador",
      applyDate: "20/04/2023",
      status: "Aceptada",
    },
    {
      id: "3",
      company: "GreenTech",
      projectName: "Initiative Cascade",
      role: "Gestor de Proyectos",
      applyDate: "05/05/2023",
      status: "Rechazada",
    },
    {
      id: "4",
      company: "ByteWorks",
      projectName: "Mission Apex",
      role: "Analista",
      applyDate: "12/06/2023",
      status: "Pendiente",
    },
    {
      id: "5",
      company: "Creative Minds",
      projectName: "Venture Summit",
      role: "Artista Visual",
      applyDate: "18/07/2023",
      status: "Aceptada",
    },
  ])

  // Filter applications based on search term
  const filteredApplications = applications.filter(
    (application) =>
      application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle cancel application
  const handleCancelApplication = (application: Application) => {
    if (application.status === "Pendiente") {
      if (confirm(`¿Estás seguro de que deseas cancelar tu aplicación para ${application.projectName}?`)) {
        setApplications((prev) => prev.filter((a) => a.id !== application.id))
      }
    } else {
      alert("No puedes cancelar una aplicación que ya ha sido procesada.")
    }
  }

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Aceptada":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      case "Rechazada":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
    }
  }

  // Column definitions for the data table
  const columns = [
    {
      accessorKey: "company",
      header: "Empresa",
      size: 1.5,
    },
    {
      accessorKey: "projectName",
      header: "Proyecto",
      size: 2,
    },
    {
      accessorKey: "role",
      header: "Rol",
      size: 1.5,
    },
    {
      accessorKey: "applyDate",
      header: "Fecha de aplicación",
      size: 1.5,
    },
    {
      accessorKey: "status",
      header: "Estado",
      size: 1.5,
      cell: ({ row }: { row: Application; getValue: () => any }) => (
        <span className={getStatusBadgeClass(row.status)}>{row.status}</span>
      ),
    },
  ]

  // Action buttons for each row
  const actions = [
    {
      label: "Cancelar",
      variant: "red" as const,
      onClick: handleCancelApplication,
      isHidden: (row: Application) => row.status !== "Pendiente",
      requireConfirmation: true,
      confirmationMessage: "¿Estás seguro de que deseas cancelar esta aplicación?",
    },
  ]

  return (
    <div className="w-full">
      
    </div>
  )
}
