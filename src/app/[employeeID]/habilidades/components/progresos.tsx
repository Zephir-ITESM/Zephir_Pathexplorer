import type React from "react"

interface Skill {
  name: string
  progress: number
  status: string
}

interface ProgresosProps {
  skillsData: Skill[]
}

const Progresos: React.FC<ProgresosProps> = ({ skillsData }) => {
  const completedCount = skillsData.filter((skill) => skill.status === "Completado").length
  const totalCount = skillsData.length
  const totalProgress = skillsData.reduce((sum, skill) => sum + skill.progress, 0)
  const averageProgress = totalCount > 0 ? totalProgress / totalCount : 0

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Progreso de Cursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">En Progreso</h3>
            <div className="text-2xl font-bold text-blue-600">
              {skillsData.filter((skill) => skill.status === "En progreso").length}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Completados</h3>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">Pendientes</h3>
            <div className="text-2xl font-bold text-yellow-600">{totalCount - completedCount}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-800 mb-2">Promedio</h3>
            <div className="text-2xl font-bold text-purple-600">{Math.round(averageProgress)}%</div>
          </div>
        </div>
      </div>

      {/* Keep the existing grid layout for skills and summary */}
    </div>
  )
}

export default Progresos
