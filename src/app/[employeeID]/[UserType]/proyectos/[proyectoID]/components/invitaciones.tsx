"use client"

import { useState } from "react"
import Image from "next/image"


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


  return (
    <div className="w-full">
      
    </div>
  )
}
