"use client"

import { useState } from "react"
import { Pagination } from "@heroui/pagination"
import { Avatar } from "@heroui/avatar"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table"
import { Icon } from "@/components/ui/icons"

interface Invitation {
  id: string
  name: string
  role: string
  level: number
  capability: number
  qualification: number
  status: "Aceptada" | "Rechazada" | "En espera"
  avatar: string
}

interface InvitacionesTabProps {
  searchTerm: string
}

export default function InvitacionesTab({ searchTerm }: InvitacionesTabProps) {
  // Mock data for invitations
  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: "1",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      status: "Rechazada",
      avatar: "/diverse-avatars.png",
    },
    {
      id: "2",
      name: "Ralph Edwards",
      role: "Frontend Dev",
      level: 9,
      capability: 96,
      qualification: 8,
      status: "Aceptada",
      avatar: "/diverse-avatars.png",
    },
    {
      id: "3",
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      status: "Rechazada",
      avatar: "/diverse-avatars.png",
    },
    {
      id: "4",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      status: "Aceptada",
      avatar: "/diverse-avatars.png",
    },
    {
      id: "5",
      name: "Emily Davis",
      role: "Backend Dev",
      level: 5,
      capability: 85,
      qualification: 8,
      status: "Aceptada",
      avatar: "/diverse-avatars.png",
    },
    {
      id: "6",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      status: "Rechazada",
      avatar: "/diverse-avatars.png",
    },
    {
      id: "7",
      name: "Sarah Wilson",
      role: "DevOps",
      level: 6,
      capability: 90,
      qualification: 8,
      status: "En espera",
      avatar: "/diverse-avatars.png",
    },
    {
      id: "8",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      status: "En espera",
      avatar: "/diverse-avatars.png",
    },
    {
      id: "9",
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      status: "Rechazada",
      avatar: "/diverse-avatars.png",
    },
    {
      id: "10",
      name: "David Martinez",
      role: "DevOps",
      level: 4,
      capability: 89,
      qualification: 8,
      status: "Rechazada",
      avatar: "/diverse-avatars.png",
    },
    {
      id: "11",
      name: "Laura Garcia",
      role: "DevOps",
      level: 3,
      capability: 78,
      qualification: 8,
      status: "En espera",
      avatar: "/diverse-avatars.png",
    },
  ])

  // Current page state for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(invitations.length / itemsPerPage)

  // Filter invitations based on search term
  const filteredInvitations = invitations.filter(
    (invitation) =>
      invitation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate the filtered invitations
  const paginatedInvitations = filteredInvitations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle view profile
  const handleViewProfile = (invitation: Invitation) => {
    console.log("View profile for:", invitation.name)
    // Implement navigation to profile page
  }

  // Get status chip color based on status
  const getStatusChipColor = (status: Invitation["status"]) => {
    switch (status) {
      case "Aceptada":
        return "success"
      case "Rechazada":
        return "danger"
      case "En espera":
        return "warning"
      default:
        return "default"
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

      {/* Invitations table */}
      <Table aria-label="Invitaciones" isStriped isHeaderSticky className="mb-4">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Invitado como</TableColumn>
          <TableColumn>Nivel</TableColumn>
          <TableColumn>Cargabilidad</TableColumn>
          <TableColumn>Calificacion</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedInvitations.map((invitation) => (
            <TableRow key={invitation.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar src={invitation.avatar} name={invitation.name} size="sm" />
                  <span>{invitation.name}</span>
                </div>
              </TableCell>
              <TableCell>{invitation.role}</TableCell>
              <TableCell>{invitation.level}</TableCell>
              <TableCell>{invitation.capability}%</TableCell>
              <TableCell>{invitation.qualification}</TableCell>
              <TableCell>
                <Chip color={getStatusChipColor(invitation.status)} size="sm" variant="flat">
                  {invitation.status}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="bordered" onClick={() => handleViewProfile(invitation)}>
                    Ver perfil
                  </Button>
                  <Button size="sm" variant="light" isIconOnly>
                    <Icon name="icon-more-vertical" size="sm" />
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
