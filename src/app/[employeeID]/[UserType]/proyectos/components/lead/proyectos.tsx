"use client"

// First, let's update the imports to include the components we need
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardBody, CardFooter } from "@heroui/card"
import { Chip } from "@heroui/chip"
import { Button } from "@heroui/button"
import { Icon } from "@/components/ui/icons"
// Define the Project interface
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

// Keep the interface definitions the same

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

  // Keep the existing handler functions
  const handleCreateProject = () => {
    setIsCreating(true)
    setTimeout(() => {
      setIsCreating(false)
    }, 2000)
  }

  const handleViewHistory = () => {
    router.push(`/${params.employeeID}/${params.UserType}/proyectos/historial`)
  }

  const handleEditProject = (id: string) => {
    router.push(`/${params.employeeID}/${params.UserType}/proyectos/${id}`)
  }

  return (
    <div className="w-full">
      {/* Add the header with title and buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <div className="flex gap-3">
          <Button variant="bordered" color="default" size="md" onClick={handleViewHistory}>
            Ver historial
          </Button>
          <Button
            variant="solid"
            color="primary"
            size="md"
            onClick={handleCreateProject}
            isLoading={isCreating}
            startContent={<Icon name="icon-plus" size="sm" />}
          >
            Crear proyecto
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-0 py-6">
        <div className="space-y-8">
          {projects.map((project) => (
            <Card key={project.id} shadow="sm" radius="lg" className="overflow-hidden">
              <CardBody className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-[#272329]">{project.name}</h2>
                      <Chip
                        variant="flat"
                        color={project.status === "en_curso" ? "primary" : "default"}
                        size="sm"
                        radius="full"
                      >
                        {project.status === "en_curso"
                          ? "Proyecto en curso"
                          : project.status === "completado"
                            ? "Proyecto completado"
                            : "Proyecto futuro"}
                      </Chip>
                    </div>
                    <div className="mt-2 text-[#999aa3]">
                      <p>Inicio de proyecto: {project.startDate}</p>
                      <p>Fin de proyecto: {project.endDate}</p>
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
              </CardBody>
              <CardFooter className="flex justify-end p-4">
                <Button variant="light" color="default" size="sm" onClick={() => handleEditProject(project.id)}>
                  Editar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProyectosLead
