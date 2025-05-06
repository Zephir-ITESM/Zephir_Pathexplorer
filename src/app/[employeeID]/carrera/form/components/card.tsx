"use client"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { CustomButton } from "@/components/ui/button"

interface CareerOption {
    id: number
    title: string
    matchPercentage: number
    duration: string
    salary: string
    focus: string
  }
  
  interface CareerCardProps {
    option: CareerOption
    isSelected: boolean
    onSelect: (id: number) => void
  }
  
  export default function CareerCard({ option, isSelected, onSelect }: CareerCardProps) {
    return (
      <div
        className={`bg-white/15 bg-blend-luminosity backdrop-blur-[46.4px] rounded-2xl p-6 shadow-xl transition-all ${
            isSelected ? "ring-2 ring-[#b700ff]" : ""
        }`}
      >
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-[#272329] mb-4">
            {option.id} - {option.title}
          </h2>
  
          {/* Match Percentage */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16">
              <CircularProgressbar
                value={option.matchPercentage}
                text={`${option.matchPercentage}%`}
                styles={buildStyles({
                  textSize: "24px",
                  pathColor: "#b700ff",
                  textColor: "#272329",
                  trailColor: "#e0e0e0",
                })}
              />
            </div>
            <p className="text-xs text-center text-[#272329]/70 mt-1">Coincidencia</p>
          </div>
        </div>
  
        {/* Career Details */}
        <div className="space-y-4 mb-6 text-left">
          <div>
            <h3 className="text-base font-bold text-[#272329]">{option.duration}</h3>
            <p className="text-xs text-[#272329]/70">Duración estimada</p>
          </div>
  
          <div>
            <h3 className="text-base font-bold text-[#272329]">{option.salary}</h3>
            <p className="text-xs text-[#272329]/70">Salario esperado</p>
          </div>
  
          <div>
            <h3 className="text-base font-bold text-[#272329]">{option.focus}</h3>
            <p className="text-xs text-[#272329]/70">Enfoque del plan</p>
          </div>
        </div>
  
        {/* Choose Button - Using CustomButton */}
        <CustomButton
          variant="purple"
          size="md"
          action={{ type: "function", handler: () => onSelect(option.id) }}
          className="w-full"
        >
          Elegir
        </CustomButton>
      </div>
    )
  }
  