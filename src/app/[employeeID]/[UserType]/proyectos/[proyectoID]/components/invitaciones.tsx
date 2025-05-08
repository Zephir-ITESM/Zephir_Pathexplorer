"use client"

import { useState } from "react"
import Image from "next/image"
import { DataTable } from "@/components/ui/data-table"

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
      avatar: "/diverse-group-city.png",
    },
    {
      id: "2",
      name: "Ralph Edwards",
      role: "Frontend Dev",
      level: 9,
      capability: 96,
      qualification: 8,
      status: "Aceptada",
      avatar: "/diverse-group-city.png",
    },
    {
      id: "3",
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      status: "Rechazada",
      avatar: "/diverse-group-city.png",
    },
    {
      id: "4",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      status: "Aceptada",
      avatar: "/diverse-group-city.png",
    },
    {
      id: "5",
      name: "Emily Davis",
      role: "Backend Dev",
      level: 5,
      capability: 85,
      qualification: 8,
      status: "Aceptada",
      avatar: "/diverse-group-city.png",
    },
    {
      id: "6",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      status: "Rechazada",
      avatar: "/diverse-group-city.png",
    },
    {
      id: "7",
      name: "Sarah Wilson",
      role: "DevOps",
      level: 6,
      capability: 90,
      qualification: 8,
      status: "En espera",
      avatar: "/diverse-group-city.png",
    },
    {
      id: "8",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      status: "En espera",
      avatar: "/diverse-group-city.png",
    },
    {
      id: "9",
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      status: "Rechazada",
      avatar: "/diverse-group-city.png",
    },
    {
      id: "10",
      name: "David Martinez",
      role: "DevOps",
      level: 4,
      capability: 89,
      qualification: 8,
      status: "Rechazada",
      avatar: "/diverse-group-city.png",
    },
    {
      id: "11",
      name: "Laura Garcia",
      role: "DevOps",
      level: 3,
      capability: 78,
      qualification: 8,
      status: "En espera",
      avatar: "/diverse-group-city.png",
    },
  ])

  // Filter invitations based on search term
  const filteredInvitations = invitations.filter(
    (invitation) =>
      invitation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle view profile
  const handleViewProfile = (invitation: Invitation) => {
    console.log("View profile for:", invitation.name)
    // Implement navigation to profile page
  }

  // Handle delete invitation
  const handleDeleteInvitation = (invitation: Invitation) => {
    if (confirm(`¿Estás seguro de que deseas eliminar la invitación de ${invitation.name}?`)) {
      setInvitations((prev) => prev.filter((i) => i.id !== invitation.id))
    }
  }

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Aceptada":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      case "Rechazada":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
      case "En espera":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
    }
  }

  // Column definitions for the data table
  const columns = [
    {
      accessorKey: "name",
      header: "Nombre",
      size: 2,
      cell: ({ row }: { row: Invitation; getValue: () => any }) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src={row.avatar || "/placeholder.svg"} alt={row.name} fill className="object-cover" />
          </div>
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Invitado como",
      size: 1.5,
    },
    {
      accessorKey: "level",
      header: "Nivel",
      size: 1,
      align: "center" as const,
    },
    {
      accessorKey: "capability",
      header: "Cargabilidad",
      size: 1.5,
      cell: ({ row }: { row: Invitation; getValue: () => any }) => <span>{row.capability}%</span>,
    },
    {
      accessorKey: "qualification",
      header: "Calificacion",
      size: 1,
      align: "center" as const,
    },
    {
      accessorKey: "status",
      header: "Estado",
      size: 1.5,
      cell: ({ row }: { row: Invitation; getValue: () => any }) => (
        <span className={getStatusBadgeClass(row.status)}>{row.status}</span>
      ),
    },
  ]

  // Action buttons for each row
  const actions = [
    {
      label: "Ver perfil",
      variant: "white" as const,
      onClick: handleViewProfile,
    },
    {
      label: "Eliminar",
      variant: "red" as const,
      onClick: handleDeleteInvitation,
      requireConfirmation: true,
      confirmationMessage: "¿Estás seguro de que deseas eliminar esta invitación?",
    },
  ]

  return (
    <div className="w-full">
      <DataTable
        data={filteredInvitations}
        columns={columns}
        actions={actions}
        pagination={{
          pageIndex: 0,
          pageSize: 10,
          pageCount: Math.ceil(filteredInvitations.length / 10),
          onPageChange: () => {},
        }}
      />
    </div>
  )
}
