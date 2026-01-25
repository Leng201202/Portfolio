import React from 'react'

function Me({ 
  aboutMeData,
  educationData, 
  sectionTitle, 
  sectionSubtitle, 
  sectionDescription, 
  highlightLabel 
}) {
  // Default "About Me" data - can be overridden by passing aboutMeData prop
  const defaultAboutMe = {
    title: "About Me",
    introduction: "Hi, I'm a passionate software developer with a love for building innovative web applications and solving complex problems.",
    paragraphs: [
      "With several years of experience in full-stack development, I specialize in creating scalable, user-friendly applications using modern technologies like React, Node.js, and cloud platforms. I thrive in collaborative environments and enjoy turning creative ideas into functional solutions.",
      "Beyond coding, I'm constantly learning and staying up-to-date with the latest industry trends. I believe in writing clean, maintainable code and following best practices to deliver high-quality software that makes a difference.",
      "When I'm not coding, you can find me contributing to open-source projects, attending tech meetups, or exploring new technologies and frameworks."
    ],
    highlights: [
      {
        icon: "💻",
        label: "Full Stack Developer",
        description: "Experienced in both frontend and backend development"
      },
      {
        icon: "🚀",
        label: "Problem Solver",
        description: "Passionate about tackling complex technical challenges"
      },
      {
        icon: "🌱",
        label: "Continuous Learner",
        description: "Always exploring new technologies and methodologies"
      },
      {
        icon: "🤝",
        label: "Team Player",
        description: "Collaborative mindset with strong communication skills"
      }
    ]
  };

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

  const aboutMe = aboutMeData || defaultAboutMe;
  const education = educationData || defaultEducation;
  const title = sectionTitle || "About Me & Education";
  const subtitle = sectionSubtitle || "Get to know me better";
  const description = sectionDescription || "Learn about my background, journey, and what drives me as a developer.";
  const highlightsLabel = highlightLabel || "Highlights:";

  return (
    <div id="me" className="bg-base-200 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Main Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-3">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
          <p className="text-base-content/80 mt-2">{description}</p>
        </div>

        {/* About Me Section */}
        <div className="mb-16">
          <div className="bg-base-100 rounded-lg p-8 shadow-sm mb-8">
            <h3 className="text-3xl font-bold mb-6">{aboutMe.title}</h3>
            
            <p className="text-lg text-base-content/90 mb-6 leading-relaxed">
              {aboutMe.introduction}
            </p>
            
            <div className="space-y-4">
              {aboutMe.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base-content/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {aboutMe.highlights.map((highlight, index) => (
              <div 
                key={index}
                className="bg-base-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{highlight.icon}</span>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{highlight.label}</h4>
                    <p className="text-base-content/70">{highlight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-8 text-center">Education</h3>
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