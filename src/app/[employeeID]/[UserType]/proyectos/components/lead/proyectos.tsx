"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

import { PageHeader } from "@/components/ui/header"

interface Project {
  id: string
  name: string
  status: "en_curso" | "completado" | "futuro"
  startDate: string
  endDate: string
  collaborators: number
  description: string
  client: string
}

interface ProyectosProps {
  userId: string
  role: string
}

const ProyectosLead = () => {
  const params = useParams()
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Path Explorer",
      status: "en_curso",
      startDate: "15 Marzo, 2025",
      endDate: "15 Junio, 2025",
      collaborators: 15,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisi, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
      client: "Accenture",
    },
    {
      id: "2",
      name: "Path Explorer V2",
      status: "futuro",
      startDate: "15 Mayo, 2025",
      endDate: "15 Agosto, 2025",
      collaborators: 15,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisi, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
      client: "Accenture",
    },
  ])

  const handleCreateProject = async () => {
    try {
      setIsCreating(true)

      // This would be replaced with an actual API call later
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock response with a generated ID
      const mockProjectId = `proj-${Math.random().toString(36).substring(2, 9)}`

      console.log("Created new project with ID:", mockProjectId)

      // Navigate to the new project details page
      router.push(`/${params.employeeID}/${params.UserType}/proyectos/${mockProjectId}`)
    } catch (error) {
      console.error("Error creating project:", error)
      // Handle error (could add toast notification here)
    } finally {
      setIsCreating(false)
    }
  }
  const handleViewHistory = () => {
    // Navigate to project history page
    router.push(`/${params.employeeID}/${params.UserType}/proyectos/historial`)
  }

  const handleEditProject = (projectId: string) => {
    // Navigate to edit project page
    alert(`Edit project ${projectId}`)
  }

  return (
    <div className="w-full">
      <PageHeader
        title="Proyectos"
        actions={[
          {
            label: "Crear proyecto",
            variant: "purple",
            onClick: handleCreateProject,
          },
          {
            label: "Ver historial",
            variant: "white",
            onClick: handleViewHistory,
          },
        ]}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-[#272329]">{project.name}</h2>
                    <span className="text-sm px-3 py-1 rounded-full bg-[#f5f7f9] text-[#888888]">
                      {project.status === "en_curso"
                        ? "Proyecto en curso"
                        : project.status === "completado"
                          ? "Proyecto completado"
                          : "Proyecto futuro"}
                    </span>
                  </div>
                  <div className="mt-2 text-[#999aa3]">
                    {project.status === "en_curso" || project.status === "completado" ? (
                      <>
                        <p>Inicio de proyecto: {project.startDate}</p>
                        <p>Fin de proyecto: {project.endDate}</p>
                      </>
                    ) : (
                      <>
                        <p>Inicio de proyecto: {project.startDate}</p>
                        <p>Fin de proyecto: {project.endDate}</p>
                      </>
                    )}
                    <p>Personal en proyecto: {project.collaborators} Colaboradores</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-lg font-medium">{project.client}</p>

                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Descripcion</h3>
                <p className="text-[#888888]">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProyectosLead
