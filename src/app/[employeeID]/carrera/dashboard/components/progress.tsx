function ProgressSection() {
    const progressData = {
      startDate: "16 de Marzo",
      startLabel: "Inicio de etapa",
      endDate: "15 de Junio",
      endLabel: "Final de etapa",
      progress: 65,
    }
  
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm h-full">
        <div className="flex justify-between mb-8">
          <div className="text-center">
            <p className="text-lg font-bold">{progressData.startDate}</p>
            <p className="text-gray-500 text-sm">{progressData.startLabel}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{progressData.endDate}</p>
            <p className="text-gray-500 text-sm">{progressData.endLabel}</p>
          </div>
        </div>
  
        <div className="relative flex justify-center items-center">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f1d6ff" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#a100ff"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progressData.progress) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <span className="text-4xl font-bold">{progressData.progress}%</span>
              <span className="text-gray-500 text-sm">Avance de etapa</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default ProgressSection