function SkillsSection() {
    const skillsData = {
      categories: [
        {
          status: "Dominado",
          color: "green",
          skills: ["Linux", "Git"],
        },
        {
          status: "En desarrollo",
          color: "yellow",
          skills: ["CI/CD", "Automatizacion"],
        },
        {
          status: "Explorando",
          color: "red",
          skills: ["Kubernetes", "Terraform"],
        },
      ],
    }
  
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4">Skills</h2>
  
        <div className="space-y-6 flex-grow">
          {skillsData.categories.map((category, index) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-3 h-3 rounded-full bg-${category.color}-500`}></span>
                <span className="font-medium">{category.status}</span>
              </div>
              <div className="pl-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="text-gray-600">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">Ver más</button>
        </div>
      </div>
    )
  }
  
export default SkillsSection