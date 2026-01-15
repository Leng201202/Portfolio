import React from 'react'

function Me({ educationData, sectionTitle, sectionSubtitle, sectionDescription, highlightLabel }) {
  // Default education data - can be overridden by passing educationData prop
  const defaultEducation = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University Name",
      period: "2015 - 2019",
      description: "Focused on software engineering, data structures, algorithms, and web development.",
      achievements: [
        "GPA: 3.8/4.0",
        "Dean's List (4 semesters)",
        "Led university coding club"
      ]
    },
    {
      degree: "Full Stack Development Bootcamp",
      institution: "Coding Academy",
      period: "2018",
      description: "Intensive program covering modern web development technologies and practices.",
      achievements: [
        "Built 8 full-stack projects",
        "Graduated top of class",
        "Received industry certification"
      ]
    }
  ];

  const education = educationData || defaultEducation;
  const title = sectionTitle || "Education";
  const subtitle = sectionSubtitle || "My academic background";
  const description = sectionDescription || "A summary of my educational qualifications and achievements, highlighting key milestones and certifications.";
  const highlightsLabel = highlightLabel || "Highlights:";

  return (
    <div id="me" className="bg-base-200 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Education Section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-3">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
          <p className="text-base-content/80 mt-2">{description}</p>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div 
              key={index}
              className="bg-base-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-1">{edu.degree}</h3>
                  <p className="text-lg text-primary">{edu.institution}</p>
                </div>
                <span className="text-base-content/60 mt-2 md:mt-0">{edu.period}</span>
              </div>
              
              <p className="text-base-content/80 mb-4">{edu.description}</p>
              
              <div className="border-t border-base-300 pt-4">
                <h4 className="font-semibold mb-3">{highlightsLabel}</h4>
                <ul className="space-y-2">
                  {edu.achievements.map((achievement, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-3 text-base-content/80"
                    >
                      <span className="text-info mt-1">◆</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Me