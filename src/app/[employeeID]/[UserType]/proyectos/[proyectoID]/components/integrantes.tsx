"use client"

import { useState } from "react"
import Image from "next/image"
import { DataTable } from "@/components/ui/data-table"

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
      avatar: "/diverse-group-city.png",
    },
    {
      id: "2",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "3",
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "4",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "5",
      name: "Emily Davis",
      role: "Backend Dev",
      level: 5,
      capability: 85,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "6",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "7",
      name: "Ralph Edwards",
      role: "Frontend Dev",
      level: 9,
      capability: 96,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "8",
      name: "Sarah Wilson",
      role: "DevOps",
      level: 6,
      capability: 90,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "9",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "10",
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "11",
      name: "David Martinez",
      role: "DevOps",
      level: 4,
      capability: 89,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "12",
      name: "Laura Garcia",
      role: "DevOps",
      level: 3,
      capability: 78,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
  ])

  // Filter team members based on search term
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  // Column definitions for the data table
  const columns = [
    {
      accessorKey: "name",
      header: "Nombre",
      size: 2,
      cell: ({ row }: { row: TeamMember; getValue: () => any }) => (
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
      header: "Rol en proyecto",
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
      cell: ({ row }: { row: TeamMember; getValue: () => any }) => <span>{row.capability}%</span>,
    },
    {
      accessorKey: "qualification",
      header: "Calificacion",
      size: 1,
      align: "center" as const,
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
      onClick: handleDeleteMember,
      requireConfirmation: true,
      confirmationMessage: "¿Estás seguro de que deseas eliminar a este miembro del proyecto?",
    },
  ]

  return (
    <div className="w-full">
      <DataTable
        data={filteredMembers}
        columns={columns}
        actions={actions}
        pagination={{
          pageIndex: 0,
          pageSize: 10,
          pageCount: Math.ceil(filteredMembers.length / 10),
          onPageChange: () => {},
        }}
      />
    </div>
  )
}
