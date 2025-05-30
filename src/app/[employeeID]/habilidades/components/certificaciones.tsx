import type React from "react"

interface Certification {
  id: number
  nombre: string
  empresa: string
  fechaExpedicion: string
  fechaExpiracion: string
}

interface IconProps {
  name: string
  className?: string
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  // Replace this with your actual Icon component implementation
  // For example, using react-icons:
  // import { FaEye, FaDownload } from 'react-icons/fa';
  // if (name === "icon-eye") return <FaEye className={className} />;
  // if (name === "icon-download") return <FaDownload className={className} />;
  return <span className={className}>{name}</span> // Placeholder
}

const Certificaciones: React.FC = () => {
  const certifications: Certification[] = [
    {
      id: 1,
      nombre: "AWS Certified Solutions Architect – Associate",
      empresa: "Amazon Web Services",
      fechaExpedicion: "2023-01-15",
      fechaExpiracion: "2026-01-15",
    },
    {
      id: 2,
      nombre: "Microsoft Certified: Azure Fundamentals",
      empresa: "Microsoft",
      fechaExpedicion: "2022-11-20",
      fechaExpiracion: "2024-11-20",
    },
    {
      id: 3,
      nombre: "Google Cloud Certified – Professional Cloud Architect",
      empresa: "Google Cloud",
      fechaExpedicion: "2023-05-01",
      fechaExpiracion: "2026-05-01",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Certifications Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Certificaciones Profesionales</h2>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Filtrar
            </button>
            <button className="px-4 py-2 bg-accenture-purple text-white rounded-lg hover:bg-accenture-purple/90 transition-colors">
              Nueva Certificación
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Activas</h3>
            <div className="text-2xl font-bold text-green-600">{certifications.length}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">Por Expirar</h3>
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-sm text-yellow-600 mt-1">En 90 días</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Habilidades</h3>
            <div className="text-2xl font-bold text-blue-600">8</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-800 mb-2">Empresas</h3>
            <div className="text-2xl font-bold text-purple-600">3</div>
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Mis Certificaciones</h3>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{cert.nombre}</h4>
                      <p className="text-sm text-gray-600 mt-1">{cert.empresa}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>Expedida: {cert.fechaExpedicion}</span>
                        <span>Expira: {cert.fechaExpiracion}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Icon name="icon-eye" className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Icon name="icon-download" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Resumen</h3>
          <p className="text-sm text-gray-700">
            Aquí puedes ver un resumen de tus certificaciones, habilidades y empresas.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Certificaciones
