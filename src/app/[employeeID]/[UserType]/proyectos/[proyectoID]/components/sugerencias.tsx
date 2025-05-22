"use client"

import { useState } from "react"
import Image from "next/image"


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

  return (
    <div className="w-full">
      
    </div>
  )
}
