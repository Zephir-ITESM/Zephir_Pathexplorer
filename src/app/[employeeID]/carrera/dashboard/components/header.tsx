function PathHeader() {
    const pathData = {
      title: "Senior DevOps Path",
      subtitle: "Mobile developer, Nivel 11",
      plan: "Plan de 5 años",
      salary: "Salario probable al finalizar: $140K - $170K",
      progress: 16,
    }
  
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{pathData.title}</h1>
          <p className="text-gray-500">{pathData.subtitle}</p>
        </div>
  
        <div className="flex items-center gap-8">
          <div>
            <p className="text-gray-700">{pathData.plan}</p>
            <p className="text-gray-500 text-sm">{pathData.salary}</p>
          </div>
  
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Avance</span>
              <span className="font-bold">{pathData.progress}%</span>
            </div>
            <div className="w-48 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#a100ff] rounded-full" style={{ width: `${pathData.progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default PathHeader