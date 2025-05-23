"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table"
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Pagination } from "@heroui/pagination"
import { Icon } from "@/components/ui/icons"

interface ProjectHistory {
  id: string
  company: string
  name: string
  leader: string
  collaborators: number
  startDate: string
  endDate: string
  description?: string
  role?: string
}

export default function HistorialUser() {
  const router = useRouter()
  const params = useParams()
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Sample project history data
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
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
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
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
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
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
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
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "5",
      company: "TechCorp",
      name: "Project Phoenix",
      leader: "Albert Flores",
      collaborators: 15,
      startDate: "01/01/2023",
      endDate: "31/12/2023",
      role: "Frontend Developer",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "6",
      company: "Creative Minds",
      name: "Venture Summit",
      leader: "Esther Howard",
      collaborators: 19,
      startDate: "20/05/2023",
      endDate: "20/12/2023",
      role: "UI Designer",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "7",
      company: "DataVision",
      name: "Task Force Nebula",
      leader: "Theresa Webb",
      collaborators: 11,
      startDate: "05/06/2023",
      endDate: "05/01/2024",
      role: "Data Analyst",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "8",
      company: "Skyline Innovations",
      name: "Program Odyssey",
      leader: "Jerome Bell",
      collaborators: 20,
      startDate: "01/07/2023",
      endDate: "01/05/2024",
      role: "Project Manager",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "9",
      company: "Nexus Corp",
      name: "Campaign Zenith",
      leader: "Jane Cooper",
      collaborators: 13,
      startDate: "15/08/2023",
      endDate: "15/03/2024",
      role: "Marketing Specialist",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "10",
      company: "Creative Minds",
      name: "Venture Summit",
      leader: "Esther Howard",
      collaborators: 19,
      startDate: "20/05/2023",
      endDate: "20/12/2023",
      role: "UI Designer",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
  ])

  // Toggle row expansion
  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  // Handle return button click
  const handleReturn = () => {
    router.push(`/${params.employeeID}/${params.UserType}/proyectos`)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on search
  }

  // Filter projects based on search query
  const filteredProjects = projectHistory.filter(
    (project) =>
      project.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.leader.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Pagination logic
  const projectsPerPage = 10
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header with title, breadcrumbs, search, and return button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Historial</h1>
              <Breadcrumbs>
                <BreadcrumbItem href={`/${params.employeeID}/${params.UserType}/proyectos`}>Proyectos</BreadcrumbItem>
                <BreadcrumbItem isCurrent>Historial</BreadcrumbItem>
              </Breadcrumbs>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <Input
                placeholder="Buscar empleados"
                value={searchQuery}
                onChange={handleSearchChange}
                startContent={<Icon name="icon-search" size="sm" />}
                className="w-full md:w-64"
              />
              <Button color="primary" variant="solid" onClick={handleReturn}>
                Regresar
              </Button>
            </div>
          </div>

          {/* Projects history table */}
          <div className="overflow-x-auto">
            <Table aria-label="Historial de proyectos" className="min-w-full">
              <TableHeader>
                <TableColumn className="w-10"> </TableColumn>
                <TableColumn className="font-medium text-left p-4">Empresa</TableColumn>
                <TableColumn className="font-medium text-left p-4">Nombre de proyecto</TableColumn>
                <TableColumn className="font-medium text-left p-4">Líder de proyecto</TableColumn>
                <TableColumn className="font-medium text-left p-4">N. de Colaboradores</TableColumn>
                <TableColumn className="font-medium text-left p-4">Inicio</TableColumn>
                <TableColumn className="font-medium text-left p-4">Fin</TableColumn>
              </TableHeader>
              <TableBody>
                {currentProjects.map((project) => (
                  <>
                    <TableRow key={project.id} className="border-b border-gray-100">
                      <TableCell className="p-4">
                        <button
                          onClick={() => toggleRowExpansion(project.id)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          {expandedRows[project.id] ? (
                            <Icon name="icon-chevron-up" size="sm" />
                          ) : (
                            <Icon name="icon-chevron-down" size="sm" />
                          )}
                        </button>
                      </TableCell>
                      <TableCell className="p-4">{project.company}</TableCell>
                      <TableCell className="p-4">{project.name}</TableCell>
                      <TableCell className="p-4">{project.leader}</TableCell>
                      <TableCell className="p-4">{project.collaborators}</TableCell>
                      <TableCell className="p-4">{project.startDate}</TableCell>
                      <TableCell className="p-4">{project.endDate}</TableCell>
                      
                    </TableRow>
                    {expandedRows[project.id] && (
                      <TableRow key={`${project.id}-expanded`} className="bg-gray-50">
                        <TableCell colSpan={7} className="p-4">
                          <div>
                            <h3 className="font-medium mb-2">Descripción</h3>
                            <p className="text-[#888888]">{project.description}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">

          </div>
        </div>
      </div>
    </div>
  )
}
