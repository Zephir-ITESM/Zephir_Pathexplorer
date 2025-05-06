"use client"

import React from "react"
import { Icon } from "@/components/ui/icons"
import { CareerInfoBackground } from "@/components/ui/backgrounds/index"
import CareerCard from "./card"
import { CustomButton } from "@/components/ui/button"

interface InformationScreenProps {
  onNext: () => void
  onBack: () => void
  onSelectCareer: (careerOptionId: number) => void
}

export default function InformationScreen({ onNext, onBack, onSelectCareer }: InformationScreenProps) {
  // Opciones de carrera profesional para mostrar al usuario
  const careerOptions = [
    {
      id: 1,
      title: "Senior Frontend developer",
      matchPercentage: 90,
      duration: "4 - 6 años",
      salary: "80,000 - 110,000 MX$ mensuales",
      focus: "Crear interfaces intuitivas y eficientes",
    },
    {
      id: 2,
      title: "Full-stack developer",
      matchPercentage: 87,
      duration: "4 - 6 años",
      salary: "80,000 - 110,000 MX$ mensuales",
      focus: "Crear interfaces intuitivas y eficientes",
    },
    {
      id: 3,
      title: "Cloud Architect",
      matchPercentage: 75,
      duration: "4 - 6 años",
      salary: "80,000 - 110,000 MX$ mensuales",
      focus: "Crear interfaces intuitivas y eficientes",
    },
  ]

  const [selectedOption, setSelectedOption] = React.useState<number | null>(null)

  const handleSelect = (id: number) => {
    setSelectedOption(id)
  }

  const handleContinue = () => {
    if (selectedOption !== null) {
      onSelectCareer(selectedOption)
      onNext()
    }
  }

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-auto">
      {/* Background using SVG component */}
      <div className="absolute inset-0">
        <CareerInfoBackground />
      </div>

      {/* Dark overlay for additional opacity */}
      <div className="absolute inset-0 z-10 opacity-30">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%2010-UGgTwvUXcNh5nC5amxhVPT1LiL7Ub8.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3D Ring Shapes */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shape%20left-Tu8LHgWObW79yAsavzknyAwZMBEm0i.png"
          alt=""
          className="absolute left-[96px] top-[227px] w-[400px] h-auto opacity-70"
        />
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shape%20middle-k1v1QakZJuO0TazaRn5u6qMnY5CeL0.png"
          alt=""
          className="absolute left-[500px] top-[-48px] w-[500px] h-auto opacity-70"
        />
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shape%20rigth-iGfVmsdmZveXPUla7HIhOJLWByocJN.png"
          alt=""
          className="absolute left-[1101px] top-[327px] w-[400px] h-auto opacity-70"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 h-full w-full flex flex-col items-center">
        <div className="px-4 w-full flex flex-col h-full">
          <div className="mt-6 flex justify-between text-black">
            <div className="flex items-center gap-2">
              <Icon name="icon-info" size="sm" />
              <p className="text-sm">Puedes cambiar tu elección en cualquier momento</p>
            </div>
            <CustomButton
              variant="white"
              size="sm"
              action={{ type: "function", handler: handleContinue }}
              disabled={selectedOption === null}
            >
              Continuar
            </CustomButton>
          </div>

          {/* Podium Layout for Cards with increased spacing */}
          <div className="relative w-full flex-1 flex flex-col items-center">
            {/* Top Card (Center) - Positioned higher */}
            <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-md">
              <CareerCard
                key={careerOptions[0].id}
                option={careerOptions[0]}
                isSelected={selectedOption === careerOptions[0].id}
                onSelect={handleSelect}
              />
            </div>

            {/* Bottom Left Card - Positioned lower and more to the left */}
            <div className="absolute bottom-[20%] left-[5%] z-20 w-full max-w-md">
              <CareerCard
                key={careerOptions[1].id}
                option={careerOptions[1]}
                isSelected={selectedOption === careerOptions[1].id}
                onSelect={handleSelect}
              />
            </div>

            {/* Bottom Right Card - Positioned lower and more to the right */}
            <div className="absolute bottom-[20%] right-[5%] z-20 w-full max-w-md">
              <CareerCard
                key={careerOptions[2].id}
                option={careerOptions[2]}
                isSelected={selectedOption === careerOptions[2].id}
                onSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
