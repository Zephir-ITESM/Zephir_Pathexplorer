"use client"

import { useState } from "react"
import Image from "next/image"
import { DataTable } from "@/components/ui/data-table"

interface Suggestion {
  id: string
  name: string
  role: string
  level: number
  capability: number
  qualification: number
  avatar: string
}

interface SugerenciasTabProps {
  searchTerm: string
}

export default function SugerenciasTab({ searchTerm }: SugerenciasTabProps) {
  // Mock data for suggestions
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
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
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "3",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "4",
      name: "Emily Davis",
      role: "Backend Dev",
      level: 5,
      capability: 85,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "5",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "6",
      name: "Sarah Wilson",
      role: "DevOps",
      level: 6,
      capability: 90,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "7",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "8",
      name: "David Martinez",
      role: "DevOps",
      level: 4,
      capability: 89,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "9",
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "10",
      name: "Laura Garcia",
      role: "DevOps",
      level: 3,
      capability: 78,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "11",
      name: "Emily Davis",
      role: "Backend Dev",
      level: 5,
      capability: 85,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "12",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
  ])

  // Filter suggestions based on search term
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle view profile
  const handleViewProfile = (suggestion: Suggestion) => {
    console.log("View profile for:", suggestion.name)
    // Implement navigation to profile page
  }

  // Handle invite
  const handleInvite = (suggestion: Suggestion) => {
    console.log("Invite:", suggestion.name)
    // In a real implementation, this would send an API request to invite the person
    // For now, we'll just remove them from the list
    setSuggestions((prev) => prev.filter((s) => s.id !== suggestion.id))
  }

  // Custom cell renderer for actions
  const ActionsCell = ({ row }: { row: Suggestion }) => {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleViewProfile(row)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Ver perfil
        </button>
        <button
          onClick={() => handleInvite(row)}
          className="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 flex items-center gap-1"
        >
          <span>Invitar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13"></path>
            <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
          </svg>
        </button>
      </div>
    )
  }

  // Column definitions for the data table
  const columns = [
    {
      accessorKey: "name",
      header: "Nombre",
      size: 2,
      cell: ({ row }: { row: Suggestion; getValue: () => any }) => (
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
      header: "Sugerido como",
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
      cell: ({ row }: { row: Suggestion; getValue: () => any }) => <span>{row.capability}%</span>,
    },
    {
      accessorKey: "qualification",
      header: "Calificacion",
      size: 1,
      align: "center" as const,
    },
    {
      accessorKey: "actions",
      header: "",
      size: 2,
      cell: ({ row }: { row: Suggestion; getValue: () => any }) => <ActionsCell row={row} />,
    },
  ]

  return (
    <div className="w-full">
      <DataTable
        data={filteredSuggestions}
        columns={columns}
        pagination={{
          pageIndex: 0,
          pageSize: 10,
          pageCount: Math.ceil(filteredSuggestions.length / 10),
          onPageChange: () => {},
        }}
      />
    </div>
  )
}
