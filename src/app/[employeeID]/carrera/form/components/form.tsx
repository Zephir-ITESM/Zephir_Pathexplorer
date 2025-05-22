"use client"

import type React from "react"

import { useState } from "react"


import { CareerTopBackground } from "@/components/ui/backgrounds/index"
import { Icon } from "@/components/ui/icons"
import { Autocomplete, AutocompleteSection, AutocompleteItem } from "@heroui/autocomplete"
import VerticalDivider from "@/components/layout/divider"
import careerOptions from "@/components/data/career.json"

interface FormScreenProps {
  onNext: () => void
  onSkip: () => void
}

export default function FormScreen({ onNext, onSkip }: FormScreenProps) {
  // Grouped options for each category
  const { priorityOptions, objectiveOptions, interestOptions } = careerOptions

  // Estado para listas de elementos seleccionados
  const [priorities, setPriorities] = useState<string[]>([])
  const [objectives, setObjectives] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])

  // Estado para valores actuales de los dropdowns
  const [prioritySelected, setPrioritySelected] = useState("")
  const [objectiveSelected, setObjectiveSelected] = useState("")
  const [interestSelected, setInterestSelected] = useState("")

  // Estado para el proceso de guardado
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Función para añadir un elemento seleccionado
  const addItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (item && !list.includes(item) && list.length < 3) {
      setList([...list, item])
      // Reset the selected value
      setSelected("")
    }
  }

  // Eliminar elemento de una lista
  const removeItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(list.filter((i) => i !== item))
  }

  // Verificar si podemos avanzar (3 selecciones en cada categoría)
  const canProceed = priorities.length === 3 && objectives.length === 3 && interests.length === 3

  // Manejar guardado y continuar
  const handleSave = async () => {
    if (canProceed) {
      try {
        setIsSaving(true)
        setSaveError(null)

        // Obtener el ID de la URL
        const pathSegments = window.location.pathname.split("/")
        const userId = pathSegments.length > 1 ? pathSegments[1] : null

        if (!userId) {
          throw new Error("No se pudo obtener el ID del usuario de la URL")
        }

        // Crear objeto de datos
        const dataToSave = {
          interests: interests,
          objectives: objectives,
        }

        // Usar nuestra nueva función API

        onNext()
      } catch (error: any) {
        console.error("Error al guardar:", error)
        setSaveError(error.message || "Error al guardar las preferencias")
        setIsSaving(false)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden">
      {/* Background using SVG component */}
      <div className="absolute inset-0">
        <CareerTopBackground />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 h-full w-full flex items-center justify-center">
        <div className="text-center px-4 w-full h-full">
          <div className="w-full pt-4 flex justify-end">
            {saveError && <div className="text-red-500 mr-4 self-center">{saveError}</div>}

          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div>
              <h1 className="text-5xl font-bold text-center text-white mb-10">Ingresa tu información</h1>
            </div>

            <div className="w-full grid grid-cols-3 gap-24">
              {/* dividers */}
              <VerticalDivider position="left" />
              <VerticalDivider position="right" />

              {/* Priorities Section */}
              <section className="col-span-1 space-y-4">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon name="icon-search-heart" className="text-black" size="xxl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Prioridades</h2>
                <p className="text-gray-600 max-w-xs mx-auto text-center">
                  Selecciona 3 aspectos más importantes para ti en tu carrera profesional
                </p>

                <Autocomplete
                  className="w-full"
                  label={`Elige una prioridad (${priorities.length}/3)`}
                  isDisabled={priorities.length >= 3}
                  value={prioritySelected}
                  onInputChange={(value) => setPrioritySelected(value)}
                >
                  <AutocompleteSection title="Dessarrollo profesional" showDivider>
                    {priorityOptions["Desarrollo profesional"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, priorities, setPriorities, setPrioritySelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                  <AutocompleteSection title="Ambiente Laboral" showDivider>
                    {priorityOptions["Ambiente Laboral"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, priorities, setPriorities, setPrioritySelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                  <AutocompleteSection title="Compensacion y estabilidad" showDivider>
                    {priorityOptions["Compensacion y estabilidad"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, priorities, setPriorities, setPrioritySelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                  <AutocompleteSection title="Impacto y valores">
                    {priorityOptions["Impacto y valores"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, priorities, setPriorities, setPrioritySelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                </Autocomplete>

                {priorities.length > 0 && (
                  <div className="flex flex-col gap-4 mt-6">

                  </div>
                )}
              </section>

              {/* Objectives Section */}
              <section className="col-span-1 space-y-4">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon name="icon-ranking" className="text-black" size="xxl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Objetivos</h2>
                <p className="text-gray-600 max-w-xs mx-auto text-center">
                  Selecciona 3 metas profesionales a corto, mediano y largo plazo
                </p>

                <Autocomplete
                  className="w-full"
                  label={`Elige un objetivo (${objectives.length}/3)`}
                  isDisabled={objectives.length >= 3}
                  value={objectiveSelected}
                  onInputChange={(value) => setObjectiveSelected(value)}
                >
                  <AutocompleteSection title="Corto Plazo (0-1 año)" showDivider>
                    {objectiveOptions["Corto Plazo (0-1 año)"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, objectives, setObjectives, setObjectiveSelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                  <AutocompleteSection title="Mediano Plazo (1-3 años)" showDivider>
                    {objectiveOptions["Mediano Plazo (1-3 años)"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, objectives, setObjectives, setObjectiveSelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                  <AutocompleteSection title="Largo Plazo (3+ años)">
                    {objectiveOptions["Largo Plazo (3+ años)"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, objectives, setObjectives, setObjectiveSelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                </Autocomplete>

                {objectives.length > 0 && (
                  <div className="flex flex-col gap-4 mt-6">

                  </div>
                )}
              </section>

              {/* Interests Section */}
              <section className="col-span-1 space-y-4">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon name="icon-shooting-star" className="text-black" size="xxl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Intereses</h2>
                <p className="text-gray-600 max-w-xs mx-auto text-center">Selecciona 3 áreas o tecnologías que te interesan más</p>

                <Autocomplete
                  className="w-full"
                  label={`Elige un interés (${interests.length}/3)`}
                  isDisabled={interests.length >= 3}
                  value={interestSelected}
                  onInputChange={(value) => setInterestSelected(value)}
                >
                  <AutocompleteSection title="Desarrollo" showDivider>
                    {interestOptions["Desarrollo"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, interests, setInterests, setInterestSelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                  <AutocompleteSection title="Inteligencia Artificial" showDivider>
                    {interestOptions["Inteligencia Artificial"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, interests, setInterests, setInterestSelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                  <AutocompleteSection title="Tecnologías Emergentes" showDivider>
                    {interestOptions["Tecnologías Emergentes"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, interests, setInterests, setInterestSelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                  <AutocompleteSection title="Especialidades">
                    {interestOptions["Especialidades"].map((option) => (
                      <AutocompleteItem
                        key={option.key}
                        onClick={() => addItem(option.label, interests, setInterests, setInterestSelected)}
                      >
                        {option.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteSection>
                </Autocomplete>

                {interests.length > 0 && (
                  <div className="flex flex-col gap-4 mt-6">

                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
