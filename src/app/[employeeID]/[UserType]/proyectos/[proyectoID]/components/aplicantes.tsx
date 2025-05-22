"use client"

import { useState } from "react"
import Image from "next/image"


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

  return (
    <div className="w-full">
      
    </div>
  )
}
