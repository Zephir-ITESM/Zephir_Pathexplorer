"use client"

import { useState, useCallback } from "react"
import { WelcomeScreen, FormScreen, InformationScreen } from "./components"

export default function CarreraPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCareerPath, setSelectedCareerPath] = useState<number | null>(null)

  // Create a callback that explicitly only changes the step without navigation
  const handleNext = useCallback(() => {
    setCurrentStep((prev) => prev + 1)
  }, [])

  const handleSkip = useCallback(() => {
    setCurrentStep((prev) => prev + 1)
  }, [])

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => prev - 1)
  }, [])

  // Manejador para cuando se selecciona un plan de carrera
  const handleCareerSelect = useCallback((careerOptionId: number) => {
    setSelectedCareerPath(careerOptionId)
  }, [])

  // Render the appropriate component based on the current step
  return (
<>
      {currentStep === 0 && <WelcomeScreen onNext={handleNext} />}
      {currentStep === 1 && <FormScreen onNext={handleNext} onSkip={handleSkip} />}
      {currentStep === 2 && (
        <InformationScreen onNext={handleNext} onBack={handleBack} onSelectCareer={handleCareerSelect} />
      )}
    </>
  )
}
