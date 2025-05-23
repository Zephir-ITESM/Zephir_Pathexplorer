"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Tabs, Tab } from "@heroui/tabs"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs"
import { Icon } from "@/components/ui/icons"
import { ProyectosTab, AplicacionesTab } from "./components"

export default function OfertaPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("sugerencias")
  const [searchTerm, setSearchTerm] = useState("")

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle return button click
  const handleReturn = () => {
    router.push(`/${params.employeeID}/${params.UserType}/proyectos`)
  }

  return (
    <div className="w-full">
      {/* Header with title, breadcrumbs, search, and return button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Buscar proyectos</h1>
          <Breadcrumbs>
            <BreadcrumbItem href={`/${params.employeeID}/${params.UserType}/proyectos`}>Proyectos</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Buscar proyectos</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <Button color="primary" variant="solid" onClick={handleReturn}>
            Regresar
          </Button>
        </div>
      </div>

      {/* Tab navigation and search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
            variant="solid"
            color="primary"
            radius="full"
            classNames={{
              tabList: "gap-2",
            }}
          >
            <Tab
              key="sugerencias"
              title={
                <div className="flex items-center gap-2">
                  <Icon name="icon-lightbulb" size="sm" />
                  <span>Sugerencias</span>
                </div>
              }
            />
            <Tab
              key="invitaciones"
              title={
                <div className="flex items-center gap-2">
                  <Icon name="icon-mail" size="sm" />
                  <span>Invitaciones</span>
                </div>
              }
            />
          </Tabs>

          <div className="w-full md:w-auto">
            <Input
              placeholder="Buscar proyecto"
              value={searchTerm}
              onChange={handleSearchChange}
              startContent={<Icon name="icon-search" size="sm" />}
              className="w-full md:w-64"
            />
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "sugerencias" && <ProyectosTab searchTerm={searchTerm} />}
        {activeTab === "invitaciones" && <AplicacionesTab searchTerm={searchTerm} />}
      </div>
    </div>
  )
}
