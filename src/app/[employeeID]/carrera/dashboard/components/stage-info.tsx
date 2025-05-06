function StageInfo() {
    const stageData = {
      title: "Etapa 1",
      subtitle: "Preparación y fundamentos",
      description:
        "En esta etapa, aprenderás los fundamentos de Linux, Git y programación básica para gestionar sistemas, automatizar tareas y colaborar en proyectos de manera eficiente.",
    }
  
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm h-auto flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full border border-gray-200">
            <span className="sr-only">Previous</span>
            <span className="text-xl">‹</span>
          </button>
  
          <div className="text-center">
            <h2 className="text-xl font-bold">{stageData.title}</h2>
            <p className="text-gray-500">{stageData.subtitle}</p>
          </div>
  
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full border border-gray-200">
            <span className="sr-only">Next</span>
            <span className="text-xl">›</span>
          </button>
        </div>
  
        <p className="text-gray-700 mb-6 flex-grow">{stageData.description}</p>
  
        <div className="flex flex-col gap-2">
          <button className="px-4 py-2 text-sm bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 w-full">
            Cambiar de camino
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 w-full">
            Editar preferencias
          </button>
        </div>
      </div>
    )
  }

export default StageInfo