"use client"

import { useState } from "react"
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { Spinner } from "@heroui/spinner"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for 5 mentees
const menteesData = [
  {
    id: 1,
    name: "Ana García",
    careerPath: "Senior DevOps Path",
    careerProgress: 45,
    coursesCompleted: 8,
    coursesInProgress: 3,
    certificationsEarned: 2,
    certificationsInProgress: 1,
    overallScore: 78,
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    careerPath: "Cloud Architect Path",
    careerProgress: 62,
    coursesCompleted: 12,
    coursesInProgress: 2,
    certificationsEarned: 4,
    certificationsInProgress: 2,
    overallScore: 85,
  },
  {
    id: 3,
    name: "María López",
    careerPath: "Full Stack Developer Path",
    careerProgress: 38,
    coursesCompleted: 6,
    coursesInProgress: 4,
    certificationsEarned: 1,
    certificationsInProgress: 1,
    overallScore: 72,
  },
  {
    id: 4,
    name: "Diego Ruiz",
    careerPath: "Data Scientist Path",
    careerProgress: 55,
    coursesCompleted: 10,
    coursesInProgress: 2,
    certificationsEarned: 3,
    certificationsInProgress: 1,
    overallScore: 81,
  },
  {
    id: 5,
    name: "Sofia Herrera",
    careerPath: "Cybersecurity Specialist Path",
    careerProgress: 29,
    coursesCompleted: 4,
    coursesInProgress: 5,
    certificationsEarned: 1,
    certificationsInProgress: 2,
    overallScore: 68,
  },
]

// Chart data transformations
const careerProgressData = menteesData.map((mentee) => ({
  name: mentee.name.split(" ")[0],
  progress: mentee.careerProgress,
  score: mentee.overallScore,
}))

const coursesData = menteesData.map((mentee) => ({
  name: mentee.name.split(" ")[0],
  completed: mentee.coursesCompleted,
  inProgress: mentee.coursesInProgress,
}))

const certificationsData = menteesData.map((mentee) => ({
  name: mentee.name.split(" ")[0],
  earned: mentee.certificationsEarned,
  inProgress: mentee.certificationsInProgress,
}))

const overallPerformanceData = menteesData.map((mentee) => ({
  name: mentee.name.split(" ")[0],
  value: mentee.overallScore,
  fill: mentee.overallScore >= 80 ? "#10b981" : mentee.overallScore >= 70 ? "#f59e0b" : "#ef4444",
}))

const monthlyProgressData = [
  { month: "Ene", avgProgress: 25 },
  { month: "Feb", avgProgress: 32 },
  { month: "Mar", avgProgress: 38 },
  { month: "Abr", avgProgress: 42 },
  { month: "May", avgProgress: 46 },
  { month: "Jun", avgProgress: 48 },
]

const pieChartData = [
  { name: "Excelente (80-100%)", value: 2, fill: "#10b981" },
  { name: "Bueno (70-79%)", value: 2, fill: "#f59e0b" },
  { name: "Necesita Mejora (<70%)", value: 1, fill: "#ef4444" },
]

export default function MenteeAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6m")
  const [isLoading, setIsLoading] = useState(false)

  // Calculate summary statistics
  const totalMentees = menteesData.length
  const avgCareerProgress = Math.round(menteesData.reduce((sum, m) => sum + m.careerProgress, 0) / totalMentees)
  const totalCoursesCompleted = menteesData.reduce((sum, m) => sum + m.coursesCompleted, 0)
  const totalCertifications = menteesData.reduce((sum, m) => sum + m.certificationsEarned, 0)

  const handleTimeframeChange = (timeframe: string) => {
    setIsLoading(true)
    setSelectedTimeframe(timeframe)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500)
  }

  const getPerformanceChipColor = (score: number) => {
    if (score >= 80) return "success"
    if (score >= 70) return "warning"
    return "danger"
  }

  const getPerformanceChipVariant = (score: number) => {
    if (score >= 80) return "solid"
    if (score >= 70) return "flat"
    return "faded"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics de Mentees</h1>
            <p className="text-gray-600">Seguimiento del progreso de tu equipo</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedTimeframe === "1m" ? "solid" : "bordered"}
              color={selectedTimeframe === "1m" ? "primary" : "default"}
              size="sm"
              onClick={() => handleTimeframeChange("1m")}
              isLoading={isLoading && selectedTimeframe === "1m"}
            >
              1M
            </Button>
            <Button
              variant={selectedTimeframe === "3m" ? "solid" : "bordered"}
              color={selectedTimeframe === "3m" ? "primary" : "default"}
              size="sm"
              onClick={() => handleTimeframeChange("3m")}
              isLoading={isLoading && selectedTimeframe === "3m"}
            >
              3M
            </Button>
            <Button
              variant={selectedTimeframe === "6m" ? "solid" : "bordered"}
              color={selectedTimeframe === "6m" ? "primary" : "default"}
              size="sm"
              onClick={() => handleTimeframeChange("6m")}
              isLoading={isLoading && selectedTimeframe === "6m"}
            >
              6M
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card shadow="sm" className="p-4">
            <CardBody className="p-0">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-600">Total Mentees</div>
                <div className="text-blue-500">👥</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalMentees}</div>
              <div className="text-xs text-gray-500 mt-1">Activos en el programa</div>
            </CardBody>
          </Card>

          <Card shadow="sm" className="p-4">
            <CardBody className="p-0">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-600">Progreso Promedio</div>
                <div className="text-green-500">📈</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{avgCareerProgress}%</div>
              <div className="text-xs text-gray-500 mt-1">En career paths</div>
            </CardBody>
          </Card>

          <Card shadow="sm" className="p-4">
            <CardBody className="p-0">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-600">Cursos Completados</div>
                <div className="text-purple-500">📚</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalCoursesCompleted}</div>
              <div className="text-xs text-gray-500 mt-1">Total del equipo</div>
            </CardBody>
          </Card>

          <Card shadow="sm" className="p-4">
            <CardBody className="p-0">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-600">Certificaciones</div>
                <div className="text-yellow-500">🏆</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalCertifications}</div>
              <div className="text-xs text-gray-500 mt-1">Obtenidas</div>
            </CardBody>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Career Progress Chart */}
          <Card shadow="md">
            <CardHeader>
              <div>
                <h3 className="text-lg font-semibold">Progreso en Career Paths</h3>
                <p className="text-sm text-gray-600">Avance individual de cada mentee</p>
              </div>
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <Spinner size="lg" color="primary" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={careerProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="progress" fill="#3b82f6" name="Progreso %" />
                    <Bar dataKey="score" fill="#10b981" name="Score General" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardBody>
          </Card>

          {/* Performance Distribution */}
          <Card shadow="md">
            <CardHeader>
              <div>
                <h3 className="text-lg font-semibold">Distribución de Rendimiento</h3>
                <p className="text-sm text-gray-600">Clasificación por nivel de performance</p>
              </div>
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <Spinner size="lg" color="primary" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Courses Progress */}
          <Card shadow="md">
            <CardHeader>
              <div>
                <h3 className="text-lg font-semibold">Progreso en Cursos</h3>
                <p className="text-sm text-gray-600">Cursos completados vs en progreso</p>
              </div>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={coursesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" name="Completados" />
                  <Bar dataKey="inProgress" fill="#f59e0b" name="En Progreso" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* Monthly Progress Trend */}
          <Card shadow="md">
            <CardHeader>
              <div>
                <h3 className="text-lg font-semibold">Tendencia de Progreso</h3>
                <p className="text-sm text-gray-600">Progreso promedio mensual del equipo</p>
              </div>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avgProgress"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    name="Progreso Promedio %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        {/* Detailed Mentee Cards */}
        <Card shadow="md">
          <CardHeader>
            <div>
              <h3 className="text-lg font-semibold">Detalle por Mentee</h3>
              <p className="text-sm text-gray-600">Vista individual del progreso de cada mentee</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menteesData.map((mentee) => (
                <Card key={mentee.id} shadow="sm" isHoverable className="p-4">
                  <CardBody className="p-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{mentee.name}</h4>
                          <p className="text-sm text-gray-600">{mentee.careerPath}</p>
                        </div>
                        <Chip
                          color={getPerformanceChipColor(mentee.overallScore)}
                          variant={getPerformanceChipVariant(mentee.overallScore)}
                          size="sm"
                        >
                          {mentee.overallScore}%
                        </Chip>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Career Progress</span>
                          <span className="font-medium">{mentee.careerProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${mentee.careerProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Cursos</p>
                          <p className="font-semibold text-gray-900">{mentee.coursesCompleted} completados</p>
                          <p className="text-gray-500">{mentee.coursesInProgress} en progreso</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Certificaciones</p>
                          <p className="font-semibold text-gray-900">{mentee.certificationsEarned} obtenidas</p>
                          <p className="text-gray-500">{mentee.certificationsInProgress} en progreso</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      fullWidth
                      onClick={() => alert(`Ver detalles de ${mentee.name}`)}
                    >
                      Ver Detalles
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
