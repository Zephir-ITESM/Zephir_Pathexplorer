function CertificationsSection() {
    const certifications = [
      {
        name: "AWS Cloud Practitioner",
        status: "Completo",
      },
      {
        name: "Kubernetes Administrator",
        status: "En progreso",
      },
      {
        name: "Terraform Associate",
        status: "Siguiente",
      },
      {
        name: "Terraform Associate",
        status: "Siguiente",
      },
      {
        name: "Terraform Associate",
        status: "Siguiente",
      },
    ]
  
    const getStatusClass = (status: string) => {
      switch (status) {
        case "Completo":
          return "bg-green-100 text-green-800"
        case "En progreso":
          return "bg-yellow-100 text-yellow-800"
        case "Siguiente":
          return "bg-purple-100 text-purple-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }
  
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4">Certificaciones</h2>
  
        <div className="space-y-4 flex-grow">
          {certifications.map((cert, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-700">{cert.name}</span>
              <span className={`px-3 py-1 rounded-full text-xs ${getStatusClass(cert.status)}`}>{cert.status}</span>
            </div>
          ))}
        </div>
  
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">Ver más</button>
        </div>
      </div>
    )
  }

export default CertificationsSection