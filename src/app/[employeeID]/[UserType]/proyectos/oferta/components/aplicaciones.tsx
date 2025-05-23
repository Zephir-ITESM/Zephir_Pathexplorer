"use client"

import { useState } from "react"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table"
import { Button } from "@heroui/button"
import { Pagination } from "@heroui/pagination"
import { Icon } from "@/components/ui/icons"

interface Invitation {
  id: string
  company: string
  leader: string
  role: string
  startDate: string
  endDate: string
  description?: string
}

interface AplicacionesTabProps {
  searchTerm: string
}

export default function AplicacionesTab({ searchTerm }: AplicacionesTabProps) {
  // Mock data for invitations
  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: "1",
      company: "TechCorp",
      leader: "Eleanor Pena",
      role: "Desarrollador",
      startDate: "01/01/2023",
      endDate: "31/12/2023",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "2",
      company: "Innova Solutions",
      leader: "Dianne Russell",
      role: "Diseñador",
      startDate: "15/02/2023",
      endDate: "15/08/2023",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "3",
      company: "GreenTech",
      leader: "Arlene McCoy",
      role: "Gestor de Proyectos",
      startDate: "01/03/2023",
      endDate: "30/11/2023",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "4",
      company: "ByteWorks",
      leader: "Courtney Henry",
      role: "Analista",
      startDate: "10/04/2023",
      endDate: "10/10/2023",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "5",
      company: "Creative Minds",
      leader: "Jenny Wilson",
      role: "Artista Visual",
      startDate: "20/05/2023",
      endDate: "20/12/2023",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "6",
      company: "DataVision",
      leader: "Savannah Nguyen",
      role: "Científico de Datos",
      startDate: "05/06/2023",
      endDate: "05/01/2024",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "7",
      company: "GreenTech",
      leader: "Arlene McCoy",
      role: "Gestor de Proyectos",
      startDate: "01/03/2023",
      endDate: "30/11/2023",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
    {
      id: "8",
      company: "Skyline Innovations",
      leader: "Theresa Webb",
      role: "Product Owner",
      startDate: "01/07/2023",
      endDate: "01/05/2024",
      description:
        "Mejorar y refactorizar código existente para asegurar la escalabilidad y mantenibilidad de la aplicación.",
    },
  ])

  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  // Current page state for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(invitations.length / itemsPerPage)

  // Toggle row expansion
  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  // Filter invitations based on search term
  const filteredInvitations = invitations.filter(
    (invitation) =>
      invitation.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate the filtered invitations
  const paginatedInvitations = filteredInvitations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle accept invitation
  const handleAccept = (invitation: Invitation) => {
    console.log("Accepted invitation:", invitation.company, invitation.role)
    // In a real implementation, this would send an API request to accept the invitation
    setInvitations((prev) => prev.filter((inv) => inv.id !== invitation.id))
  }

  // Handle reject invitation
  const handleReject = (invitation: Invitation) => {
    console.log("Rejected invitation:", invitation.company, invitation.role)
    // In a real implementation, this would send an API request to reject the invitation
    setInvitations((prev) => prev.filter((inv) => inv.id !== invitation.id))
  }

  return (
    <div className="w-full">
      {/* Invitations table */}
      <div className="overflow-x-auto">
        <Table aria-label="Invitaciones a proyectos" className="min-w-full">
          <TableHeader>
            <TableColumn className="font-medium text-left p-4">Empresa</TableColumn>
            <TableColumn className="font-medium text-left p-4">Líder</TableColumn>
            <TableColumn className="font-medium text-left p-4">Rol en proyecto</TableColumn>
            <TableColumn className="font-medium text-left p-4">Inicio</TableColumn>
            <TableColumn className="font-medium text-left p-4">Fin</TableColumn>
            <TableColumn className="font-medium text-right p-4">Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedInvitations.map((invitation) => (
              <>
                <TableRow key={invitation.id} className="border-b border-gray-100">
                  <TableCell className="p-4">{invitation.company}</TableCell>
                  <TableCell className="p-4">{invitation.leader}</TableCell>
                  <TableCell className="p-4">{invitation.role}</TableCell>
                  <TableCell className="p-4">{invitation.startDate}</TableCell>
                  <TableCell className="p-4">{invitation.endDate}</TableCell>
                  <TableCell className="p-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button
                        color="success"
                        size="sm"
                        onClick={() => handleAccept(invitation)}
                        startContent={<Icon name="icon-check" size="sm" />}
                      >
                        Aceptar
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleReject(invitation)}
                        startContent={<Icon name="icon-x" size="sm" />}
                      >
                        Rechazar
                      </Button>
                      <button
                        onClick={() => toggleRowExpansion(invitation.id)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        {expandedRows[invitation.id] ? (
                          <Icon name="icon-chevron-up" size="sm" />
                        ) : (
                          <Icon name="icon-chevron-down" size="sm" />
                        )}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRows[invitation.id] && (
                  <TableRow key={`${invitation.id}-expanded`} className="bg-gray-50">
                    <TableCell colSpan={6} className="p-4">
                      <div>
                        <h3 className="font-medium mb-2">Descripción</h3>
                        <p className="text-[#888888]">{invitation.description}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        
      </div>
    </div>
  )
}
