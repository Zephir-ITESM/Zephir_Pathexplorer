"use client"

// First, let's update the imports to include the components we need
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardBody, CardFooter } from "@heroui/card"
import { Chip } from "@heroui/chip"
import { Button } from "@heroui/button"
import { Icon } from "@/components/ui/icons"
import { fetchWithAuth } from "@/services/api"

// Define the Project interface
interface Project {
  id_proyecto: number
  nombre: string
  descripcion: string
  fecha_inicio: string
  fecha_fin: string
  id_delivery_lead: string
  cupo_limite: number
  horas: number
  created_at?: string
  updated_at?: string
}

// Keep the interface definitions the same

const ProyectosLead = () => {
  const params = useParams()
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/api/proyectos/user/proyectos/deliverylead?idDeliveryLead=${params.employeeID}`,
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Could not fetch projects", error)
      }
    }

    getProjects()
  }, [params.employeeID])

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
            <Card key={project.id_proyecto} shadow="sm" radius="lg" className="overflow-hidden">
              <CardBody className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-[#272329]">{project.nombre}</h2>
                      <Chip variant="flat" color={"primary"} size="sm" radius="full">
                        {"Proyecto en curso"}
                      </Chip>
                    </div>
                    <div className="mt-2 text-[#999aa3]">
                      <p>Inicio de proyecto: {project.fecha_inicio}</p>
                      <p>Fin de proyecto: {project.fecha_fin}</p>
                      <p>Personal en proyecto: {project.cupo_limite} Colaboradores</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-lg font-medium">{"Accenture"}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Descripcion</h3>
                  <p className="text-[#888888]">{project.descripcion}</p>
                </div>
              </CardBody>
              <CardFooter className="flex justify-end p-4">
                <Button
                  variant="light"
                  color="default"
                  size="sm"
                  onClick={() => handleEditProject(project.id_proyecto.toString())}
                >
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
