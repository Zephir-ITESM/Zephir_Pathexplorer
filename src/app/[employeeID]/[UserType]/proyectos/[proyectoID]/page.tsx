"use client"

import type React from "react"
import { useAuth } from "@/auth/useAuth"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { IntegrantesTab, InvitacionesTab, AplicantesTab, SugerenciasTab} from "./components/index"
import { PageHeader } from "@/components/ui/header"
import { DateRangePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input"
import { NumberInput } from "@heroui/number-input"
import { Autocomplete } from "@heroui/autocomplete"

// Define the project interface
interface Project {
  id: string
  name: string
  company: string
  description: string
  startDate: string | Date
  endDate: string | Date
  teamMembers: {
    role: string
    count: number
  }[]
}

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { role, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("detalles")
  const [isSaving, setIsSaving] = useState(false)
  const [isNewlyCreated, setIsNewlyCreated] = useState(false)
  const [project, setProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const projectRoles = [
    {key: "frontend-dev", label: "Frontend Developer"},
    {key: "backend-dev", label: "Backend Developer"},
    {key: "fullstack-dev", label: "Fullstack Developer"},
    {key: "devops-engineer", label: "DevOps Engineer"},
    {key: "qa-engineer", label: "QA Engineer"},
    {key: "ui-designer", label: "UI Designer"},
    {key: "ux-designer", label: "UX Designer"},
    {key: "product-manager", label: "Product Manager"},
    {key: "project-manager", label: "Project Manager"},
    {key: "scrum-master", label: "Scrum Master"},
    {key: "data-scientist", label: "Data Scientist"},
    {key: "data-engineer", label: "Data Engineer"},
    {key: "security-engineer", label: "Security Engineer"},
  ];

  useEffect(() => {
    const projectId = params.proyectoID as string

    // Fetch project data
    fetchProjectData(projectId)
  }, [params.proyectoID])

  // Convert string date to Date object
  const parseDate = (dateString: string): Date => {
    if (!dateString) return new Date()
    return new Date(dateString)
  }

  // Format Date object to string (YYYY-MM-DD)
  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  // Mock function to fetch project data
  const fetchProjectData = async (projectId: string) => {
    try {
      // In a real implementation, this would be an API call
      // For now, we'll check if this is a newly created project based on ID format
      const isNewProject = projectId.startsWith("proj-")

      if (isNewProject) {
        setIsNewlyCreated(true)

        // For a new project, initialize with empty data but keep the ID
        setProject({
          id: projectId,
          name: "",
          company: "",
          description: "",
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)), // Default to 3 months from now
          teamMembers: [
            { role: "Frontend Developer", count: 4 },
            { role: "Backend Developer", count: 4 },
            { role: "DevOps", count: 1 },
          ],
        })
      } else {
        // For existing projects, load the data
        // In a real implementation, this would be an API call
        // Mock data for now
        setProject({
          id: projectId,
          name: "Path Explorer",
          company: "Accenture",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.",
          startDate: parseDate("2025-03-15"),
          endDate: parseDate("2025-06-15"),
          teamMembers: [
            { role: "Frontend Developer", count: 4 },
            { role: "Backend Developer", count: 4 },
            { role: "DevOps", count: 1 },
          ],
        })
      }
    } catch (error) {
      console.error("Error fetching project data:", error)
      // Handle error - could show an error message or redirect
    }
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (!project) return

    setProject((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  // Handle date changes
  const handleDateChange = (name: string, date: Date | null) => {
    if (!project || !date) return

    setProject((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [name]: date,
      }
    })
  }

  // Handle team member count changes
  const handleTeamCountChange = (index: number, increment: boolean) => {
    if (!project) return

    setProject((prev) => {
      if (!prev) return prev

      const newTeamMembers = [...prev.teamMembers]
      if (increment) {
        newTeamMembers[index].count += 1
      } else if (newTeamMembers[index].count > 0) {
        newTeamMembers[index].count -= 1
      }
      return {
        ...prev,
        teamMembers: newTeamMembers,
      }
    })
  }

  // Calculate total team members
  const totalTeamMembers = project?.teamMembers.reduce((sum, member) => sum + member.count, 0) || 0

  // Handle save button click
  const handleSave = async () => {
    if (!project) return

    setIsSaving(true)
    try {
      // Convert Date objects to strings for API submission
      const projectToSave = {
        ...project,
        startDate: project.startDate instanceof Date ? formatDate(project.startDate) : project.startDate,
        endDate: project.endDate instanceof Date ? formatDate(project.endDate) : project.endDate,
      }

      // In a real implementation, this would be an API call to save/update the project
      console.log("Saving project:", projectToSave)

      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // After successful save, redirect back to projects page
      router.push(`/${params.employeeId}/${params.UserType}/proyectos`)
    } catch (error) {
      console.error("Error saving project:", error)
      // Handle error (could add toast notification here)
    } finally {
      setIsSaving(false)
    }
  }

  // Handle cancel button click
  const handleCancel = () => {
    router.push(`/${params.employeeId}/${params.UserType}/proyectos`)
  }

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setSearchTerm("") // Reset search term when changing tabs
  }

  if (isLoading || project === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accenture-purple"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Header with title, breadcrumb, actions, and tab-specific elements */}
      <PageHeader
        title={isNewlyCreated ? "Nuevo Proyecto" : project.name || "Detalles del Proyecto"}
        breadcrumbs={[
          {
            label: "Proyectos",
            href: `/${params.employeeId}/${params.UserType}/proyectos`,
          },
          {
            label: isNewlyCreated ? "Nuevo Proyecto" : project.name || "Detalles",
            href: "#",
          },
        ]}
        actions={[
          {
            label: "Cancelar",
            variant: "white",
            onClick: handleCancel,
          },
          {
            label: "Guardar",
            variant: "purple",
            onClick: handleSave,
            loading: isSaving,
          },
        ]}
      />

      {/* Tab menu */}

      {/* Content based on active tab */}
      {activeTab === "detalles" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Left column - Project details */}
          <div className="space-y-6">
            <div>
              <Input
                type="text"
                id="projectName"
                name="projectName"
                label="Nombre"
                placeholder="Ingrese el nombre del proyecto"
              />
            </div>

            <div>
              
            </div>

            <div>
              <Input
                type="text"
                id="company"
                name="company"
                label="Empresa"
                placeholder="Ingrese el nombre de la empresa"
              />
            </div>

            <div>
              <Input
                type="text"
                id="description"
                name="description"
                label="Descripción"
                placeholder="Descripcion del proyecto"
              />
            </div>

            <DateRangePicker 
              className="max-w" 
              label="Duracion de proyecto" 
            />
          </div>

          {/* Right column - Team composition */}
          <div className="space-y-6">
            {project.teamMembers.map((member, index) => (
              <NumberInput 
                label={member.role}
              />
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="font-bold">{totalTeamMembers}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrantes tab */}
      {activeTab === "Integrantes" && <IntegrantesTab searchTerm={searchTerm} />}

      {/* Invitaciones tab */}
      {activeTab === "Invitaciones" && <InvitacionesTab searchTerm={searchTerm} />}

      {/* Aplicantes tab */}
      {activeTab === "Aplicantes" && <AplicantesTab searchTerm={searchTerm} />}

      {/* Sugerencias tab */}
      {activeTab === "Sugerencias" && <SugerenciasTab searchTerm={searchTerm} />}
    </div>
  )
}
