"use client"

import { useState } from "react"


interface Project {
  id: string
  company: string
  name: string
  leader: string
  role: string
  startDate: string
  endDate: string
  description?: string
}

interface ProyectosTabProps {
  searchTerm: string
}

export default function ProyectosTab({ searchTerm }: ProyectosTabProps) {
  // Mock data for projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      company: "TechCorp",
      name: "Project Phoenix",
      leader: "Eleanor Pena",
      role: "Desarrollador",
      startDate: "01/01/2023",
      endDate: "31/12/2023",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "2",
      company: "Innova Solutions",
      name: "Operation Horizon",
      leader: "Dianne Russell",
      role: "Diseñador",
      startDate: "15/02/2023",
      endDate: "15/08/2023",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "3",
      company: "GreenTech",
      name: "Initiative Cascade",
      leader: "Arlene McCoy",
      role: "Gestor de Proyectos",
      startDate: "01/03/2023",
      endDate: "30/11/2023",
    },
    {
      id: "4",
      company: "ByteWorks",
      name: "Mission Apex",
      leader: "Courtney Henry",
      role: "Analista",
      startDate: "10/04/2023",
      endDate: "10/10/2023",
    },
    {
      id: "5",
      company: "Creative Minds",
      name: "Venture Summit",
      leader: "Jenny Wilson",
      role: "Artista Visual",
      startDate: "20/05/2023",
      endDate: "20/12/2023",
    },
    {
      id: "6",
      company: "DataVision",
      name: "Data Insights",
      leader: "Savannah Nguyen",
      role: "Científico de Datos",
      startDate: "05/06/2023",
      endDate: "05/01/2024",
    },
    {
      id: "7",
      company: "GreenTech",
      name: "Eco Solutions",
      leader: "Arlene McCoy",
      role: "Gestor de Proyectos",
      startDate: "01/03/2023",
      endDate: "30/11/2023",
    },
    {
      id: "8",
      company: "Skyline Innovations",
      name: "Cloud Platform",
      leader: "Theresa Webb",
      role: "Product Owner",
      startDate: "01/07/2023",
      endDate: "01/05/2024",
    },
    {
      id: "9",
      company: "Nexus Corp",
      name: "Integration Hub",
      leader: "Darlene Robertson",
      role: "Tester",
      startDate: "15/08/2023",
      endDate: "15/03/2024",
    },
  ])

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    (project) =>
      project.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle apply to project
  const handleApply = (project: Project) => {
    console.log("Applied to project:", project.name)
    // In a real implementation, this would send an API request to apply to the project
  }

  // Handle view details
  const handleViewDetails = (project: Project) => {
    console.log("View details for:", project.name)
    // Implement navigation to project details page
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
      header: "Nombre",
      size: 2,
    },
    {
      accessorKey: "leader",
      header: "Líder",
      size: 1.5,
    },
    {
      accessorKey: "role",
      header: "Rol en proyecto",
      size: 1.5,
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
  ]

  // Action buttons for each row
  const actions = [
    {
      label: "Aplicar",
      variant: "green" as const,
      onClick: handleApply,
    },
  ]

  // Add expandable configuration for project description
  const expandableConfig = {
    isExpandable: (row: Project) => !!row.description,
    content: (row: Project) => (
      <div className="p-4">
        <h3 className="font-medium mb-2">Descripción</h3>
        <p className="text-[#888888]">{row.description || "No hay descripción disponible para este proyecto."}</p>
      </div>
    ),
  }

  return (
    <div className="w-full">
      
    </div>
  )
}
