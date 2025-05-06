function JobOpportunity() {
    const jobData = {
      title: "Junior Cloud Engineer",
      subtitle: "Puesto disponible para proyecto de Accenture",
      readiness: 70,
      description:
        "Tienes las habilidades necesarias para contribuir de manera efectiva en este proyecto a la vez que aprendes sobre las mejores prácticas.",
    }
  
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-bold">{jobData.title}</h2>
          <p className="text-gray-500">{jobData.subtitle}</p>
        </div>
  
        <div className="flex gap-8 mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f1d6ff" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#b700ff"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * jobData.readiness) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <span className="text-3xl font-bold">{jobData.readiness}%</span>
              <span className="text-gray-500 text-sm">Preparado</span>
            </div>
          </div>
  
          <div className="flex-1">
            <p className="text-gray-700">{jobData.description}</p>
          </div>
        </div>
  
        <div className="text-right">
          <button className="px-4 py-2 text-sm bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
            Ver oportunidad
          </button>
        </div>
      </div>
    )
  }

export default JobOpportunity