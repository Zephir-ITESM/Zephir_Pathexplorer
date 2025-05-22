"use client"

import { useState } from "react"
import Image from "next/image"


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

  

  return (
    <div className="w-full">
      
    </div>
  )
}
