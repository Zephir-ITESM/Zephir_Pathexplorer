"use client"

import { useState } from "react"
import { Pagination } from "@heroui/pagination"
import { Avatar } from "@heroui/avatar"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table"
import { Icon } from "@/components/ui/icons"

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
      avatar: "/diverse-avatars.png",
    },
    {
      id: "2",
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "3",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "4",
      name: "Emily Davis",
      role: "Backend Dev",
      level: 5,
      capability: 85,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "5",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "6",
      name: "Sarah Wilson",
      role: "DevOps",
      level: 6,
      capability: 90,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "7",
      name: "Michael Brown",
      role: "Frontend Dev",
      level: 10,
      capability: 98,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "8",
      name: "David Martinez",
      role: "DevOps",
      level: 4,
      capability: 89,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "9",
      name: "Jessica Taylor",
      role: "Frontend Dev",
      level: 7,
      capability: 92,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "10",
      name: "Laura Garcia",
      role: "DevOps",
      level: 3,
      capability: 78,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "11",
      name: "Emily Davis",
      role: "Backend Dev",
      level: 5,
      capability: 85,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
    {
      id: "12",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      avatar: "/diverse-avatars.png",
    },
  ])

  // Current page state for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(suggestions.length / itemsPerPage)

  // Filter suggestions based on search term
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate the filtered suggestions
  const paginatedSuggestions = filteredSuggestions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

      {/* Suggestions table */}
      <Table aria-label="Sugerencias" isStriped isHeaderSticky className="mb-4">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Sugerido como</TableColumn>
          <TableColumn>Nivel</TableColumn>
          <TableColumn>Cargabilidad</TableColumn>
          <TableColumn>Calificacion</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedSuggestions.map((suggestion) => (
            <TableRow key={suggestion.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar src={suggestion.avatar} name={suggestion.name} size="sm" />
                  <span>{suggestion.name}</span>
                </div>
              </TableCell>
              <TableCell>{suggestion.role}</TableCell>
              <TableCell>{suggestion.level}</TableCell>
              <TableCell>{suggestion.capability}%</TableCell>
              <TableCell>{suggestion.qualification}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="bordered" onClick={() => handleViewProfile(suggestion)}>
                    Ver perfil
                  </Button>
                  <Button size="sm" color="success" onClick={() => handleInvite(suggestion)}>
                    Invitar
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
