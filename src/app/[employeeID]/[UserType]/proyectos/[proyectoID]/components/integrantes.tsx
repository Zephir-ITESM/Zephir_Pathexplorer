"use client"

import { useState } from "react"
import { Pagination } from "@heroui/pagination"
import { Avatar } from "@heroui/avatar"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table"
import { Icon } from "@/components/ui/icons"

interface TeamMember {
  id: string
  name: string
  role: string
  level: number
  capability: number
  qualification: number
  avatar: string
}

interface IntegrantesTabProps {
  searchTerm: string
}

export default function IntegrantesTab({ searchTerm }: IntegrantesTabProps) {
  // Mock data for team members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
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
      name: "Emily Davis",
      role: "Backend Dev",
      level: 5,
      capability: 85,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "6",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "7",
      name: "Ralph Edwards",
      role: "Frontend Dev",
      level: 9,
      capability: 96,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "8",
      name: "Sarah Wilson",
      role: "DevOps",
      level: 6,
      capability: 90,
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
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
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
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage)

  // Filter team members based on search term
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate the filtered members
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle view profile
  const handleViewProfile = (member: TeamMember) => {
    console.log("View profile for:", member.name)
    // Implement navigation to profile page
  }

  // Handle delete member
  const handleDeleteMember = (member: TeamMember) => {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${member.name} del proyecto?`)) {
      setTeamMembers((prev) => prev.filter((m) => m.id !== member.id))
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

      {/* Team members table */}
      <Table aria-label="Integrantes del proyecto" isStriped isHeaderSticky className="mb-4">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Rol en proyecto</TableColumn>
          <TableColumn>Nivel</TableColumn>
          <TableColumn>Cargabilidad</TableColumn>
          <TableColumn>Calificacion</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar src={member.avatar} name={member.name} size="sm" />
                  <span>{member.name}</span>
                </div>
              </TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.level}</TableCell>
              <TableCell>{member.capability}%</TableCell>
              <TableCell>{member.qualification}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="bordered" onClick={() => handleViewProfile(member)}>
                    Ver perfil
                  </Button>
                  <Button size="sm" color="danger" onClick={() => handleDeleteMember(member)}>
                    Eliminar
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
