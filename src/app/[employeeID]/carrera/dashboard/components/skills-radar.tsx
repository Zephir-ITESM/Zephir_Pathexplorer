"use client"

import { useEffect, useRef } from "react"

function SkillsRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const skillsData = {
    categories: ["Cloud", "CI/CD", "Git", "Linux", "Automation"],
    values: [0.7, 0.6, 0.5, 0.8, 0.6],
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    // Draw background grid
    ctx.strokeStyle = "#e5e7eb"
    ctx.fillStyle = "#f9fafb"

    // Draw radar background
    ctx.beginPath()
    for (let i = 5; i > 0; i--) {
      const scale = i / 5
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * scale, 0, Math.PI * 2)
      ctx.fillStyle = i % 2 === 0 ? "#f9fafb" : "#f3f4f6"
      ctx.fill()
    }

    // Draw radar lines
    const categories = skillsData.categories
    const angleStep = (Math.PI * 2) / categories.length

    for (let i = 0; i < categories.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
      ctx.strokeStyle = "#d1d5db"
      ctx.stroke()

      // Draw category labels
      const labelX = centerX + (radius + 20) * Math.cos(angle)
      const labelY = centerY + (radius + 20) * Math.sin(angle)
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(categories[i], labelX, labelY)
    }

    // Draw data points
    ctx.beginPath()
    const values = skillsData.values

    for (let i = 0; i < values.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = values[i]
      const pointX = centerX + radius * value * Math.cos(angle)
      const pointY = centerY + radius * value * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(pointX, pointY)
      } else {
        ctx.lineTo(pointX, pointY)
      }
    }

    // Close the path
    const firstAngle = -Math.PI / 2
    const firstValue = values[0]
    ctx.lineTo(
      centerX + radius * firstValue * Math.cos(firstAngle),
      centerY + radius * firstValue * Math.sin(firstAngle),
    )

    // Fill the radar chart
    ctx.fillStyle = "rgba(255, 149, 0, 0.3)"
    ctx.fill()

    // Draw the outline
    ctx.strokeStyle = "rgba(255, 149, 0, 0.8)"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [skillsData])

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm flex justify-center">
      <canvas ref={canvasRef} width={300} height={300} className="max-w-full" />
    </div>
  )
}

export default SkillsRadar