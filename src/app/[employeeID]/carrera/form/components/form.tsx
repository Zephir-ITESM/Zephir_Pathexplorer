"use client"

import type React from "react"

import { useState } from "react"
import { CustomButton } from "@/components/ui/button"
import { CustomTag } from "@/components/ui/tag"
import { CustomSelect } from "@/components/ui/select"
import { CareerTopBackground } from "@/components/ui/backgrounds/index"
import { Icon } from "@/components/ui/icons"

interface FormScreenProps {
  onNext: () => void
  onSkip: () => void
}

export default function FormScreen({ onNext, onSkip }: FormScreenProps) {
  // Grouped options for each category
  const priorityOptions = [
    {
      label: "Desarrollo Profesional",
      options: [
        { value: "Crecimiento profesional", label: "Crecimiento profesional" },
        { value: "Aprendizaje constante", label: "Aprendizaje constante" },
        { value: "Proyectos desafiantes", label: "Proyectos desafiantes" },
        { value: "Desarrollo de habilidades blandas", label: "Desarrollo de habilidades blandas" },
        { value: "Acceso a formación continua", label: "Acceso a formación continua" },
      ],
    },
    {
      label: "Ambiente Laboral",
      options: [
        { value: "Buen ambiente laboral", label: "Buen ambiente laboral" },
        { value: "Balance vida-trabajo", label: "Balance vida-trabajo" },
        { value: "Liderazgo positivo", label: "Liderazgo positivo" },
        { value: "Trabajo en equipo", label: "Trabajo en equipo" },
        { value: "Diversidad e inclusión", label: "Diversidad e inclusión" },
      ],
    },
    {
      label: "Compensación y Estabilidad",
      options: [
        { value: "Estabilidad económica", label: "Estabilidad económica" },
        { value: "Reconocimiento del esfuerzo", label: "Reconocimiento del esfuerzo" },
        { value: "Flexibilidad horaria", label: "Flexibilidad horaria" },
        { value: "Seguridad laboral", label: "Seguridad laboral" },
      ],
    },
    {
      label: "Impacto y Valores",
      options: [
        { value: "Ética profesional", label: "Ética profesional" },
        { value: "Innovación tecnológica", label: "Innovación tecnológica" },
        { value: "Impacto social", label: "Impacto social" },
        { value: "Oportunidades internacionales", label: "Oportunidades internacionales" },
        { value: "Autonomía en decisiones", label: "Autonomía en decisiones" },
        { value: "Retroalimentación constructiva", label: "Retroalimentación constructiva" },
      ],
    },
  ]

  const objectiveOptions = [
    {
      label: "Corto Plazo (0-1 año)",
      options: [
        { value: "Conseguir mi primer empleo", label: "Conseguir mi primer empleo" },
        { value: "Mejorar mi inglés técnico", label: "Mejorar mi inglés técnico" },
        { value: "Certificarme en tecnología clave", label: "Certificarme en tecnología clave" },
        { value: "Crear un portafolio sólido", label: "Crear un portafolio sólido" },
        { value: "Publicar un artículo técnico", label: "Publicar un artículo técnico" },
      ],
    },
    {
      label: "Mediano Plazo (1-3 años)",
      options: [
        { value: "Liderar un pequeño equipo", label: "Liderar un pequeño equipo" },
        { value: "Obtener un ascenso", label: "Obtener un ascenso" },
        { value: "Participar en conferencias", label: "Participar en conferencias" },
        { value: "Colaborar en proyectos open source", label: "Colaborar en proyectos open source" },
        { value: "Trabajar en una empresa top", label: "Trabajar en una empresa top" },
      ],
    },
    {
      label: "Largo Plazo (3+ años)",
      options: [
        { value: "Trabajar en el extranjero", label: "Trabajar en el extranjero" },
        { value: "Desarrollar un producto propio", label: "Desarrollar un producto propio" },
        { value: "Empezar una maestría", label: "Empezar una maestría" },
        { value: "Especializarme en IA", label: "Especializarme en IA" },
        { value: "Fundar una startup", label: "Fundar una startup" },
        { value: "Ser mentor de nuevos talentos", label: "Ser mentor de nuevos talentos" },
        { value: "Lograr independencia financiera", label: "Lograr independencia financiera" },
        { value: "Convertirme en arquitecto de software", label: "Convertirme en arquitecto de software" },
        { value: "Patentar una idea", label: "Patentar una idea" },
        { value: "Ser referente en mi industria", label: "Ser referente en mi industria" },
      ],
    },
  ]

  const interestOptions = [
    {
      label: "Desarrollo",
      options: [
        { value: "Desarrollo móvil", label: "Desarrollo móvil" },
        { value: "Frontend con React", label: "Frontend con React" },
        { value: "Backend en Python", label: "Backend en Python" },
        { value: "Arquitectura de software", label: "Arquitectura de software" },
        { value: "DevOps", label: "DevOps" },
      ],
    },
    {
      label: "Inteligencia Artificial",
      options: [
        { value: "Inteligencia Artificial", label: "Inteligencia Artificial" },
        { value: "Machine Learning", label: "Machine Learning" },
        { value: "Ciencia de datos", label: "Ciencia de datos" },
        { value: "Simulación de agentes", label: "Simulación de agentes" },
      ],
    },
    {
      label: "Tecnologías Emergentes",
      options: [
        { value: "Blockchain", label: "Blockchain" },
        { value: "Realidad aumentada", label: "Realidad aumentada" },
        { value: "Realidad virtual", label: "Realidad virtual" },
        { value: "Internet de las cosas", label: "Internet de las cosas" },
        { value: "Cloud computing", label: "Cloud computing" },
      ],
    },
    {
      label: "Especialidades",
      options: [
        { value: "Ciberseguridad", label: "Ciberseguridad" },
        { value: "Robótica", label: "Robótica" },
        { value: "Juegos con Unity", label: "Juegos con Unity" },
        { value: "Ética en tecnología", label: "Ética en tecnología" },
        { value: "Sistemas embebidos", label: "Sistemas embebidos" },
        { value: "Automatización industrial", label: "Automatización industrial" },
      ],
    },
  ]

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
      // Make sure to reset the selected value to empty string
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
            <CustomButton
              variant="white"
              size="sm"
              action={{ type: "function", handler: handleSave }}
              disabled={!canProceed || isSaving}
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </CustomButton>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div>
              <h1 className="text-5xl font-bold text-center text-white mb-10">Ingresa tu información</h1>
            </div>

            <div className="w-full flex justify-center gap-20">
              {/* Priorities Section */}
              <section className="space-y-4 w-xs">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon name="icon-search-heart" className="text-black" size="xxl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Prioridades</h2>
                <p className="text-gray-600">Selecciona 3 aspectos más importantes para ti en tu carrera profesional</p>

                <CustomSelect
                  options={priorityOptions}
                  value=""
                  onChange={(value) => {
                    if (typeof value === "string" && value) {
                      addItem(value, priorities, setPriorities, setPrioritySelected)
                    }
                  }}
                  placeholder={`Elige una prioridad (${priorities.length}/3)`}
                  disabled={priorities.length >= 3}
                  fullWidth={true}
                />

                {priorities.length > 0 && (
                  <div className="flex flex-col gap-4 mt-6">
                    {priorities.map((priority, index) => (
                      <CustomTag
                        key={index}
                        variant="purple"
                        removable
                        onRemove={() => removeItem(priorities, setPriorities, priority)}
                        className="w-full"
                      >
                        {priority}
                      </CustomTag>
                    ))}
                  </div>
                )}
              </section>

              <div className="flex items-center justify-center">
                <svg width="2" height="797" viewBox="0 0 2 797" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.00003 796L1 1"
                    stroke="url(#paint0_linear_419_5559)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_419_5559"
                      x1="1.5"
                      y1="1"
                      x2="1.50003"
                      y2="796"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#272329" stopOpacity="0" />
                      <stop offset="0.5" stopColor="#272329" />
                      <stop offset="1" stopColor="#272329" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Objectives Section */}
              <section className="space-y-4 w-xs">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon name="icon-ranking" className="text-black" size="xxl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Objetivos</h2>
                <p className="text-gray-600">Selecciona 3 metas profesionales a corto, mediano y largo plazo</p>

                <CustomSelect
                  options={objectiveOptions}
                  value=""
                  onChange={(value) => {
                    if (typeof value === "string" && value) {
                      addItem(value, objectives, setObjectives, setObjectiveSelected)
                    }
                  }}
                  placeholder={`Elige un objetivo (${objectives.length}/3)`}
                  disabled={objectives.length >= 3}
                  fullWidth={true}
                />

                {objectives.length > 0 && (
                  <div className="flex flex-col gap-4 mt-6">
                    {objectives.map((objective, index) => (
                      <CustomTag
                        key={index}
                        variant="purple"
                        removable
                        onRemove={() => removeItem(objectives, setObjectives, objective)}
                        className="w-full"
                      >
                        {objective}
                      </CustomTag>
                    ))}
                  </div>
                )}
              </section>

              <div className="flex items-center justify-center">
                <svg width="2" height="797" viewBox="0 0 2 797" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.00003 796L1 1"
                    stroke="url(#paint0_linear_419_5559)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_419_5559"
                      x1="1.5"
                      y1="1"
                      x2="1.50003"
                      y2="796"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#272329" stopOpacity="0" />
                      <stop offset="0.5" stopColor="#272329" />
                      <stop offset="1" stopColor="#272329" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Interests Section */}
              <section className="space-y-4 w-xs">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon name="icon-shooting-star" className="text-black" size="xxl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Intereses</h2>
                <p className="text-gray-600">Selecciona 3 áreas o tecnologías que te interesan más</p>

                <CustomSelect
                  options={interestOptions}
                  value=""
                  onChange={(value) => {
                    if (typeof value === "string" && value) {
                      addItem(value, interests, setInterests, setInterestSelected)
                    }
                  }}
                  placeholder={`Elige un interés (${interests.length}/3)`}
                  disabled={interests.length >= 3}
                  fullWidth={true}
                />

                {interests.length > 0 && (
                  <div className="flex flex-col gap-4 mt-6">
                    {interests.map((interest, index) => (
                      <CustomTag
                        key={index}
                        variant="purple"
                        removable
                        onRemove={() => removeItem(interests, setInterests, interest)}
                        className="w-full"
                      >
                        {interest}
                      </CustomTag>
                    ))}
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
