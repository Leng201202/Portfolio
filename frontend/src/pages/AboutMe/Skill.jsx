import React from 'react'

function Skill({ skillsData }) {
  // Default skills data - can be overridden by passing skillsData prop
  const defaultSkills = {
    "Frontend Development": [
      "React & Redux",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5 & CSS3",
      "Tailwind CSS",
      "Responsive Design"
    ],
    "Backend Development": [
      "Node.js",
      "NestJS",
      "Express.js",
      "RESTful APIs",
      "GraphQL",
      "Microservices"
    ],
    "Database": [
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Redis",
      "Database Design",
      "SQL & NoSQL"
    ],
    "Tools & Others": [
      "Git & GitHub",
      "Docker",
      "CI/CD",
      "AWS",
      "Agile Methodology",
      "Problem Solving"
    ]
  };

  const skills = skillsData || defaultSkills;

  return (
    <div className="bg-base-200 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-3">Skills</h2>
          <p className="text-base-content/60">Technologies and tools I use to build solutions</p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items], index) => (
            <div 
              key={index}
              className="bg-base-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-base-300">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((skill, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start gap-3 text-base-content/80"
                  >
                    <span className="text-primary mt-1">▪</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Skill