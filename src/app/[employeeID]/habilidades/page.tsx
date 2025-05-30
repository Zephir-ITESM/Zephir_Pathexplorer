"use client"

import { useState } from "react"
import { Tabs, Tab } from "@heroui/tabs"
import { Icon } from "@/components/ui/icons"

import HistorialEducativo from "./components/historial"
import Progresos from "./components/progresos"
import Certificaciones from "./components/certificaciones"

export default function HabilidadesPage() {
  const [selectedTab, setSelectedTab] = useState("historial")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Desarrollo de Habilidades</h1>
              <p className="text-gray-600 mt-1">Gestiona tu crecimiento profesional y certificaciones</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-accenture-purple text-white rounded-lg hover:bg-accenture-purple/90 transition-colors">
                Explorar Cursos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-6">
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
          variant="underlined"
          size="lg"
          color="primary"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-accenture-purple",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-accenture-purple",
          }}
        >
          <Tab
            key="historial"
            title={
              <div className="flex items-center space-x-2">
                <Icon name="icon-medal" className="w-5 h-5" />
                <span>Historial Educativo</span>
              </div>
            }
          >
            <div className="mt-6">
              <HistorialEducativo />
            </div>
          </Tab>

          <Tab
            key="progresos"
            title={
              <div className="flex items-center space-x-2">
                <Icon name="icon-book" className="w-5 h-5" />
                <span>Progreso de Cursos</span>
              </div>
            }
          >
            <div className="mt-6">
              
            </div>
          </Tab>

          <Tab
            key="certificaciones"
            title={
              <div className="flex items-center space-x-2">
                <Icon name="icon-checklist" className="w-5 h-5" />
                <span>Certificaciones</span>
              </div>
            }
          >
            <div className="mt-6">
              <Certificaciones />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
