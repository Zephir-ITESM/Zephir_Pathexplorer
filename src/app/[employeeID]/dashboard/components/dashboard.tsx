"use client"

import { useState } from "react"
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

// Sample employee data
const employeeData = {
  name: "María González",
  position: "Software Engineer II",
  department: "Technology",
  employeeId: "ACC-2024-1234",
  joinDate: "2022-03-15",
  currentCareerPath: "Full Stack Developer Path",
  careerLevel: "Intermediate",
  nextLevel: "Senior Developer",
  overallProgress: 68,
  profileImage: "/placeholder.svg?height=80&width=80&text=MG",
}

// Career path progress data
const careerPathData = [
  { skill: "Frontend", current: 85, target: 90 },
  { skill: "Backend", current: 75, target: 85 },
  { skill: "Database", current: 60, target: 80 },
  { skill: "DevOps", current: 45, target: 70 },
  { skill: "Testing", current: 70, target: 75 },
]

// Learning recommendations
const learningRecommendations = [
  {
    id: 1,
    title: "Advanced React Patterns",
    type: "Course",
    duration: "8 hours",
    priority: "High",
    skillArea: "Frontend",
    provider: "Accenture Learning",
    deadline: "2024-02-15",
  },
  {
    id: 2,
    title: "Docker & Kubernetes Fundamentals",
    type: "Certification",
    duration: "16 hours",
    priority: "Medium",
    skillArea: "DevOps",
    provider: "External",
    deadline: "2024-03-01",
  },
  {
    id: 3,
    title: "Database Optimization Techniques",
    type: "Workshop",
    duration: "4 hours",
    priority: "Medium",
    skillArea: "Database",
    provider: "Internal",
    deadline: "2024-02-28",
  },
]

// Upcoming opportunities
const upcomingOpportunities = [
  {
    id: 1,
    title: "AWS Solutions Architect Certification",
    type: "Certification",
    startDate: "2024-02-20",
    registrationDeadline: "2024-02-10",
    spots: 15,
    spotsLeft: 8,
  },
  {
    id: 2,
    title: "Leadership Skills Workshop",
    type: "Workshop",
    startDate: "2024-02-25",
    registrationDeadline: "2024-02-15",
    spots: 20,
    spotsLeft: 12,
  },
  {
    id: 3,
    title: "Agile Project Management",
    type: "Course",
    startDate: "2024-03-05",
    registrationDeadline: "2024-02-20",
    spots: 25,
    spotsLeft: 18,
  },
]

// Performance review history
const performanceHistory = [
  {
    period: "Q4 2023",
    overallRating: 4.2,
    technicalSkills: 4.5,
    collaboration: 4.0,
    leadership: 3.8,
    feedback: "Excellent technical performance, continue developing leadership skills",
  },
  {
    period: "Q3 2023",
    overallRating: 4.0,
    technicalSkills: 4.2,
    collaboration: 4.1,
    leadership: 3.5,
    feedback: "Strong progress in all areas, focus on mentoring junior developers",
  },
  {
    period: "Q2 2023",
    overallRating: 3.8,
    technicalSkills: 4.0,
    collaboration: 3.9,
    leadership: 3.4,
    feedback: "Good technical growth, improve cross-team collaboration",
  },
]

// Progress over time data
const progressOverTime = [
  { quarter: "Q1 2023", progress: 45 },
  { quarter: "Q2 2023", progress: 52 },
  { quarter: "Q3 2023", progress: 61 },
  { quarter: "Q4 2023", progress: 68 },
]

export default function dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "danger"
      case "Medium":
        return "warning"
      case "Low":
        return "success"
      default:
        return "default"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Certification":
        return "primary"
      case "Course":
        return "secondary"
      case "Workshop":
        return "success"
      default:
        return "default"
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.0) return "#17C964"
    if (rating >= 3.5) return "#F5A524"
    return "#F31260"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ colorScheme: "light" }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <Card shadow="md" className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {employeeData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">¡Bienvenida, {employeeData.name}!</h1>
                  <p className="text-gray-600">
                    {employeeData.position} • {employeeData.department}
                  </p>
                  <p className="text-sm text-gray-500">ID: {employeeData.employeeId}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{employeeData.overallProgress}%</div>
                <div className="text-sm text-gray-600">Progreso en Career Path</div>
                <Chip color="primary" variant="flat" size="sm" className="mt-2">
                  {employeeData.currentCareerPath}
                </Chip>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "overview" ? "solid" : "bordered"}
            color={activeTab === "overview" ? "primary" : "default"}
            onClick={() => setActiveTab("overview")}
          >
            Resumen
          </Button>
          <Button
            variant={activeTab === "learning" ? "solid" : "bordered"}
            color={activeTab === "learning" ? "primary" : "default"}
            onClick={() => setActiveTab("learning")}
          >
            Aprendizaje
          </Button>
          <Button
            variant={activeTab === "opportunities" ? "solid" : "bordered"}
            color={activeTab === "opportunities" ? "primary" : "default"}
            onClick={() => setActiveTab("opportunities")}
          >
            Oportunidades
          </Button>
          <Button
            variant={activeTab === "performance" ? "solid" : "bordered"}
            color={activeTab === "performance" ? "primary" : "default"}
            onClick={() => setActiveTab("performance")}
          >
            Evaluaciones
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Career Progress Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card shadow="md" className="bg-white">
                <CardHeader>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Progreso por Habilidad</h3>
                    <p className="text-sm text-gray-600">Tu avance hacia el siguiente nivel</p>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    {careerPathData.map((skill) => (
                      <div key={skill.skill}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{skill.skill}</span>
                          <span className="text-gray-500">
                            {skill.current}% / {skill.target}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(skill.current / skill.target) * 100}%`,
                              backgroundColor: skill.current >= skill.target ? "#17C964" : "#0072F5",
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card shadow="md" className="bg-white">
                <CardHeader>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Progreso Histórico</h3>
                    <p className="text-sm text-gray-600">Tu evolución en el último año</p>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="bg-white" style={{ colorScheme: "light" }}>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={progressOverTime}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="quarter" tick={{ fill: "#64748b" }} />
                        <YAxis tick={{ fill: "#64748b" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            color: "#1e293b",
                          }}
                        />
                        <Line type="monotone" dataKey="progress" stroke="#0072F5" strokeWidth={3} name="Progreso %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card shadow="md" className="bg-white">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button color="primary" variant="flat" className="h-16 flex-col">
                    <span className="text-lg">📚</span>
                    <span className="text-sm">Mis Cursos</span>
                  </Button>
                  <Button color="success" variant="flat" className="h-16 flex-col">
                    <span className="text-lg">🎯</span>
                    <span className="text-sm">Objetivos</span>
                  </Button>
                  <Button color="warning" variant="flat" className="h-16 flex-col">
                    <span className="text-lg">📊</span>
                    <span className="text-sm">Mi Perfil</span>
                  </Button>
                  <Button color="secondary" variant="flat" className="h-16 flex-col">
                    <span className="text-lg">💬</span>
                    <span className="text-sm">Feedback</span>
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Learning Tab */}
        {activeTab === "learning" && (
          <div className="space-y-6">
            <Card shadow="md" className="bg-white">
              <CardHeader>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recomendaciones de Aprendizaje</h3>
                  <p className="text-sm text-gray-600">Cursos y certificaciones personalizadas para tu rol</p>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {learningRecommendations.map((item) => (
                    <Card key={item.id} shadow="sm" className="bg-gray-50">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600">
                              {item.provider} • {item.duration}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Chip color={getPriorityColor(item.priority)} variant="flat" size="sm">
                              {item.priority}
                            </Chip>
                            <Chip color={getTypeColor(item.type)} variant="flat" size="sm">
                              {item.type}
                            </Chip>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Área:</span> {item.skillArea} •
                            <span className="font-medium"> Fecha límite:</span> {item.deadline}
                          </div>
                          <Button size="sm" color="primary" variant="flat">
                            Inscribirse
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === "opportunities" && (
          <div className="space-y-6">
            <Card shadow="md" className="bg-white">
              <CardHeader>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Próximas Oportunidades</h3>
                  <p className="text-sm text-gray-600">Certificaciones y entrenamientos disponibles</p>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingOpportunities.map((opportunity) => (
                    <Card key={opportunity.id} shadow="sm" className="bg-white">
                      <CardBody className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{opportunity.title}</h4>
                            <Chip color={getTypeColor(opportunity.type)} variant="flat" size="sm" className="mt-1">
                              {opportunity.type}
                            </Chip>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              <span className="font-medium">Inicio:</span> {opportunity.startDate}
                            </p>
                            <p>
                              <span className="font-medium">Registro hasta:</span> {opportunity.registrationDeadline}
                            </p>
                            <p>
                              <span className="font-medium">Cupos disponibles:</span> {opportunity.spotsLeft}/
                              {opportunity.spots}
                            </p>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(opportunity.spotsLeft / opportunity.spots) * 100}%`,
                                backgroundColor: opportunity.spotsLeft > 5 ? "#17C964" : "#F5A524",
                              }}
                            ></div>
                          </div>
                        </div>
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button
                          size="sm"
                          color="primary"
                          variant="solid"
                          fullWidth
                          isDisabled={opportunity.spotsLeft === 0}
                        >
                          {opportunity.spotsLeft === 0 ? "Sin cupos" : "Registrarse"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === "performance" && (
          <div className="space-y-6">
            <Card shadow="md" className="bg-white">
              <CardHeader>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Historial de Evaluaciones</h3>
                  <p className="text-sm text-gray-600">Tus evaluaciones de desempeño recientes</p>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {performanceHistory.map((review, index) => (
                    <Card key={index} shadow="sm" className="bg-gray-50">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.period}</h4>
                            <p className="text-sm text-gray-600 mt-2">{review.feedback}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold" style={{ color: getRatingColor(review.overallRating) }}>
                              {review.overallRating}
                            </div>
                            <div className="text-xs text-gray-500">Rating General</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{review.technicalSkills}</div>
                            <div className="text-gray-600">Técnicas</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{review.collaboration}</div>
                            <div className="text-gray-600">Colaboración</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{review.leadership}</div>
                            <div className="text-gray-600">Liderazgo</div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
