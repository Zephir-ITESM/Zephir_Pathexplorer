"use client"

import type React from "react"
import { useAuth } from "@/auth/useAuth"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { IntegrantesTab, InvitacionesTab, AplicantesTab, SugerenciasTab } from "./components/index"
import { DateRangePicker } from "@heroui/date-picker"
import { Input } from "@heroui/input"
import { NumberInput } from "@heroui/number-input"
import { Textarea } from "@heroui/input"
import { Button } from "@heroui/button"
import { Tabs, Tab } from "@heroui/tabs"
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs"
import { Icon } from "@/components/ui/icons"

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

// Tab identifiers as numbers
const TAB_DETALLES = 0
const TAB_INTEGRANTES = 1
const TAB_INVITACIONES = 2
const TAB_APLICANTES = 3
const TAB_SUGERENCIAS = 4

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { role, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState(TAB_DETALLES)
  const [isSaving, setIsSaving] = useState(false)
  const [isNewlyCreated, setIsNewlyCreated] = useState(false)
  const [project, setProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])

  const projectRoles = [
    { key: "frontend-dev", label: "Frontend Developer" },
    { key: "backend-dev", label: "Backend Developer" },
    { key: "fullstack-dev", label: "Fullstack Developer" },
    { key: "devops-engineer", label: "DevOps Engineer" },
    { key: "qa-engineer", label: "QA Engineer" },
    { key: "ui-designer", label: "UI Designer" },
    { key: "ux-designer", label: "UX Designer" },
    { key: "product-manager", label: "Product Manager" },
    { key: "project-manager", label: "Project Manager" },
    { key: "scrum-master", label: "Scrum Master" },
    { key: "data-scientist", label: "Data Scientist" },
    { key: "data-engineer", label: "Data Engineer" },
    { key: "security-engineer", label: "Security Engineer" },
  ]

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
        const startDate = new Date()
        const endDate = new Date(new Date().setMonth(new Date().getMonth() + 3)) // Default to 3 months from now

        setProject({
          id: projectId,
          name: "",
          company: "",
          description: "",
          startDate: startDate,
          endDate: endDate,
          teamMembers: [
            { role: "Frontend Developer", count: 4 },
            { role: "Backend Developer", count: 4 },
            { role: "DevOps", count: 1 },
          ],
        })

        setDateRange([startDate, endDate])
      } else {
        // For existing projects, load the data
        // In a real implementation, this would be an API call
        // Mock data for now
        const startDate = parseDate("2025-03-15")
        const endDate = parseDate("2025-06-15")

        setProject({
          id: projectId,
          name: "Path Explorer",
          company: "Accenture",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.",
          startDate: startDate,
          endDate: endDate,
          teamMembers: [
            { role: "Frontend Developer", count: 4 },
            { role: "Backend Developer", count: 4 },
            { role: "DevOps", count: 1 },
          ],
        })

        setDateRange([startDate, endDate])
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

  // Handle date range changes
  const handleDateRangeChange = (range: [Date | null, Date | null]) => {
    setDateRange(range)

    if (!project) return

    const [startDate, endDate] = range

    setProject((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        startDate: startDate || prev.startDate,
        endDate: endDate || prev.endDate,
      }
    })
  }

  // Handle team member count changes
  const handleTeamCountChange = (index: number, value: number) => {
    if (!project) return

    setProject((prev) => {
      if (!prev) return prev

      const newTeamMembers = [...prev.teamMembers]
      newTeamMembers[index].count = value

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
      router.push(`/${params.employeeID}/${params.UserType}/proyectos`)
    } catch (error) {
      console.error("Error saving project:", error)
      // Handle error (could add toast notification here)
    } finally {
      setIsSaving(false)
    }
  }

  // Handle cancel button click
  const handleCancel = () => {
    router.push(`/${params.employeeID}/${params.UserType}/proyectos`)
  }

  // Handle tab change
  const handleTabChange = (key: React.Key) => {
    const tabId = typeof key === "number" ? key : Number(key)
    setActiveTab(tabId)
    setSearchTerm("") // Reset search term when changing tabs
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
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
      {/* Header with title, breadcrumb, and actions */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{project.name || "Nuevo Proyecto"}</h1>
            <Breadcrumbs>
              <BreadcrumbItem href={`/${params.employeeID}/${params.UserType}/proyectos`}>Proyectos</BreadcrumbItem>
              <BreadcrumbItem isCurrent>{project.name || "Nuevo Proyecto"}</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <div className="flex gap-3">
            <Button variant="bordered" color="default" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={handleSave}
              isLoading={isSaving}
              startContent={<Icon name="icon-save" size="sm" />}
            >
              Guardar
            </Button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center justify-between">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={handleTabChange}
            variant="underlined"
            color="primary"
            classNames={{
              tabList: "gap-4",
            }}
          >
            <Tab
              key={TAB_DETALLES}
              title={
                <div className="flex items-center gap-2">
                  <Icon name="icon-edit" size="sm" />
                  <span>Detalles</span>
                </div>
              }
            />
            <Tab
              key={TAB_INTEGRANTES}
              title={
                <div className="flex items-center gap-2">
                  <Icon name="icon-users" size="sm" />
                  <span>Integrantes</span>
                </div>
              }
            />
            <Tab
              key={TAB_INVITACIONES}
              title={
                <div className="flex items-center gap-2">
                  <Icon name="icon-mail" size="sm" />
                  <span>Invitaciones</span>
                </div>
              }
            />
            <Tab
              key={TAB_APLICANTES}
              title={
                <div className="flex items-center gap-2">
                  <Icon name="icon-user-plus" size="sm" />
                  <span>Aplicantes</span>
                </div>
              }
            />
            <Tab
              key={TAB_SUGERENCIAS}
              title={
                <div className="flex items-center gap-2">
                  <Icon name="icon-lightbulb" size="sm" />
                  <span>Sugerencias</span>
                </div>
              }
            />
          </Tabs>

          {/* Search input for tabs other than detalles */}
          {activeTab !== TAB_DETALLES && (
            <div className="w-full max-w-md">
              <Input
                placeholder="Buscar empleados"
                value={searchTerm}
                onChange={handleSearchChange}
                startContent={<Icon name="icon-search" size="sm" />}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === TAB_DETALLES && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column - Project details */}
            <div className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  label="Nombre"
                  placeholder="Ingrese el nombre del proyecto"
                  value={project.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="company"
                  label="Empresa"
                  placeholder="Ingrese el nombre de la empresa"
                  value={project.company}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Textarea
                  name="description"
                  label="Descripción"
                  placeholder="Descripción del proyecto"
                  value={project.description}
                  onChange={handleInputChange}
                  minRows={4}
                />
              </div>

              <div>
                <DateRangePicker label="Duración de proyecto" />
              </div>
            </div>

            {/* Right column - Team composition */}
            <div>
              <h3 className="text-lg font-medium mb-4">Integrantes requeridos</h3>
              <div className="space-y-4">
                {project.teamMembers.map((member, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{member.role}</span>
                    <div className="flex items-center">
                      <NumberInput
                        value={member.count}
                        onChange={(value) => {
                          if (typeof value === "number") {
                            handleTeamCountChange(index, value)
                          } else if (value && typeof value === "object" && "target" in value) {
                            const num = Number(value.target.value)
                            if (!isNaN(num)) {
                              handleTeamCountChange(index, num)
                            }
                          }
                        }}
                        min={0}
                        max={20}
                        step={1}
                      />
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">{totalTeamMembers}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs */}
      {activeTab === TAB_INTEGRANTES && <IntegrantesTab searchTerm={searchTerm} />}
      {activeTab === TAB_INVITACIONES && <InvitacionesTab searchTerm={searchTerm} />}
      {activeTab === TAB_APLICANTES && <AplicantesTab searchTerm={searchTerm} />}
      {activeTab === TAB_SUGERENCIAS && <SugerenciasTab searchTerm={searchTerm} />}
    </div>
  )
}
