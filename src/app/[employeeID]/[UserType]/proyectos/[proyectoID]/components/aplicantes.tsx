"use client"

import { useState } from "react"
import Image from "next/image"
import { DataTable } from "@/components/ui/data-table"

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
      name: "Ralph Edwards",
      role: "Frontend Dev",
      level: 9,
      capability: 96,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "6",
      name: "Emily Davis",
      role: "Backend Dev",
      level: 5,
      capability: 85,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "7",
      name: "Chris Johnson",
      role: "Backend Dev",
      level: 8,
      capability: 94,
      qualification: 8,
      avatar: "/diverse-group-city.png",
    },
    {
      id: "8",
      name: "Laura Garcia",
      role: "DevOps",
      level: 3,
      capability: 78,
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
      name: "Sarah Wilson",
      role: "DevOps",
      level: 6,
      capability: 90,
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

  // Filter applicants based on search term
  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  // Custom cell renderer for actions
  const ActionsCell = ({ row }: { row: Applicant }) => {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleViewProfile(row)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Ver perfil
        </button>
        <button
          onClick={() => handleAcceptApplicant(row)}
          className="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 flex items-center gap-1"
        >
          <span>Aceptar</span>
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
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
        <button
          onClick={() => handleDeleteApplicant(row)}
          className="p-1 text-gray-500 hover:text-red-500"
          aria-label="Eliminar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
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
      cell: ({ row }: { row: Applicant; getValue: () => any }) => (
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
      header: "Aplica como",
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
      cell: ({ row }: { row: Applicant; getValue: () => any }) => <span>{row.capability}%</span>,
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
      cell: ({ row }: { row: Applicant; getValue: () => any }) => <ActionsCell row={row} />,
    },
  ]

  return (
    <div className="w-full">
      <DataTable
        data={filteredApplicants}
        columns={columns}
        pagination={{
          pageIndex: 0,
          pageSize: 10,
          pageCount: Math.ceil(filteredApplicants.length / 10),
          onPageChange: () => {},
        }}
      />
    </div>
  )
}
