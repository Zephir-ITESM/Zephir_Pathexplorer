interface EducationRecord {
  institucion: string
  titulo: string
  fechaInicio: string
  fechaFin: string
  fechaExpiracion: string
  descripcion: string
}

const HistorialEducativo = () => {
  const sampleData: EducationRecord[] = [
    {
      institucion: "Universidad Tecnológica Nacional",
      titulo: "Ingeniería en Sistemas",
      fechaInicio: "01/03/2015",
      fechaFin: "15/12/2020",
      fechaExpiracion: "N/A",
      descripcion: "Carrera de grado en Ingeniería en Sistemas de Información.",
    },
    {
      institucion: "Coursera",
      titulo: "Certificado Profesional de Google Data Analytics",
      fechaInicio: "20/01/2021",
      fechaFin: "20/07/2021",
      fechaExpiracion: "20/07/2024",
      descripcion: "Certificado profesional que valida habilidades en análisis de datos.",
    },
    {
      institucion: "Platzi",
      titulo: "Curso de React.js",
      fechaInicio: "01/05/2022",
      fechaFin: "15/06/2022",
      fechaExpiracion: "N/A",
      descripcion: "Curso intensivo sobre el framework React.js.",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Historial Educativo</h2>
          <button className="px-4 py-2 bg-accenture-purple text-white rounded-lg hover:bg-accenture-purple/90 transition-colors">
            Agregar Educación
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Total de Estudios</h3>
            <div className="text-3xl font-bold text-accenture-purple">{sampleData.length}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Certificaciones Activas</h3>
            <div className="text-3xl font-bold text-green-500">
              {
                sampleData.filter((item) => new Date(item.fechaExpiracion.split("/").reverse().join("-")) > new Date())
                  .length
              }
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Próximas a Expirar</h3>
            <div className="text-3xl font-bold text-yellow-500">1</div>
            <p className="text-sm text-gray-500 mt-1">En 90 días</p>
          </div>
        </div>
      </div>

      {/* Existing table content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Registros Educativos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Institución
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Título
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha Inicio
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha Fin
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha Expiración
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleData.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.institucion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.titulo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.fechaInicio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.fechaFin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.fechaExpiracion}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{record.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HistorialEducativo
