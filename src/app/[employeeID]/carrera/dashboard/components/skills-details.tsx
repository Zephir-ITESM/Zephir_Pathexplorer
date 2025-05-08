function SkillsDetails() {
    const skillsDetails = [
      {
        name: "Cloud",
        description:
          "Tienes una base sólida en servicios en la nube, pero aún puedes mejorar en arquitecturas escalables y optimización de costos.",
      },
      {
        name: "Automation",
        description:
          "Tienes nociones básicas de automatización, pero necesitas trabajar más en la orquestación de procesos y herramientas avanzadas.",
      },
      {
        name: "Linux",
        description:
          "Dominas los comandos fundamentales y la administración básica, pero aún puedes mejorar en scripting y gestión avanzada de servidores.",
      },
      {
        name: "Git",
        description:
          "Conoces los conceptos esenciales de Git, pero te falta práctica en estrategias avanzadas como rebase y manejo de conflictos complejos.",
      },
      {
        name: "CI/CD",
        description:
          "Tienes un buen conocimiento de los flujos de integración y despliegue continuo, pero necesitas experiencia aplicándolos en entornos productivos.",
      },
    ]
  
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="space-y-6">
          {skillsDetails.map((skill, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-1">{skill.name}</h3>
              <p className="text-gray-700">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

export default SkillsDetails