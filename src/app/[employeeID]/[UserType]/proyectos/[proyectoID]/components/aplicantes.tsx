"use client"

import { useState } from "react"
import { Pagination } from "@heroui/pagination"
import { Avatar } from "@heroui/avatar"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table"
import { Icon } from "@/components/ui/icons"

interface Applicant {
  id: string
  name: string
  role: string
  level: number
  capability: number
  qualification: number
  avatar: string
}

interface AplicantesTabProps {
  searchTerm: string
}

export default function AplicantesTab({ searchTerm }: AplicantesTabProps) {
  // Mock data for applicants
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: "1",
      name: "Ralph Edwards",
      role: "Frontend Dev",
      level: 9,
      capability: 96,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "2",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "3",
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "4",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "5",
      name: "Ralph Edwards",
      role: "Frontend Dev",
      level: 9,
      capability: 96,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "6",
      name: "Emily Davis",
      role: "Backend Dev",
      level: 5,
      capability: 85,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "7",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "8",
      name: "Laura Garcia",
      role: "DevOps",
      level: 3,
      capability: 78,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "9",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "10",
      name: "Sarah Wilson",
      role: "DevOps",
      level: 6,
      capability: 90,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "11",
      name: "David Martinez",
      role: "DevOps",
      level: 4,
      capability: 89,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "12",
      name: "Laura Garcia",
      role: "DevOps",
      level: 3,
      capability: 78,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
  ])

  // Current page state for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(applicants.length / itemsPerPage)

  // Filter applicants based on search term
  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate the filtered applicants
  const paginatedApplicants = filteredApplicants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle view profile
  const handleViewProfile = (applicant: Applicant) => {
    console.log("View profile for:", applicant.name)
    // Implement navigation to profile page
  }

  // Handle accept applicant
  const handleAcceptApplicant = (applicant: Applicant) => {
    console.log("Accept applicant:", applicant.name)
    // In a real implementation, this would send an API request to accept the applicant
    // For now, we'll just remove them from the list
    setApplicants((prev) => prev.filter((a) => a.id !== applicant.id))
  }

  // Handle delete applicant
  const handleDeleteApplicant = (applicant: Applicant) => {
    if (confirm(`¿Estás seguro de que deseas eliminar la aplicación de ${applicant.name}?`)) {
      setApplicants((prev) => prev.filter((a) => a.id !== applicant.id))
    }
  }

  return (
    <div className="w-full">
      {/* Search input */}
      <div className="mb-6">
        <Input
          placeholder="Buscar empleados"
          value={searchTerm}
          startContent={<Icon name="icon-search" size="sm" />}
          className="max-w-md"
        />
      </div>

      {/* Applicants table */}
      <Table aria-label="Aplicantes" isStriped isHeaderSticky className="mb-4">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Aplica como</TableColumn>
          <TableColumn>Nivel</TableColumn>
          <TableColumn>Cargabilidad</TableColumn>
          <TableColumn>Calificacion</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedApplicants.map((applicant) => (
            <TableRow key={applicant.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar src={applicant.avatar} name={applicant.name} size="sm" />
                  <span>{applicant.name}</span>
                </div>
              </TableCell>
              <TableCell>{applicant.role}</TableCell>
              <TableCell>{applicant.level}</TableCell>
              <TableCell>{applicant.capability}%</TableCell>
              <TableCell>{applicant.qualification}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="bordered" onClick={() => handleViewProfile(applicant)}>
                    Ver perfil
                  </Button>
                  <Button size="sm" color="success" onClick={() => handleAcceptApplicant(applicant)}>
                    Aceptar
                  </Button>
                  <Button size="sm" variant="light" isIconOnly onClick={() => handleDeleteApplicant(applicant)}>
                    <Icon name="icon-trash" size="sm" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center">
        
      </div>
    </div>
  )
}
