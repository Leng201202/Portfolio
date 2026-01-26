import React, { useEffect, useState } from 'react'
import usePortfolioStore from '../../store/usePortfolioStore'
import { portfolioAPI } from '../../api'

function Me({ 
  aboutMeData,
  educationData, 
  sectionTitle, 
  sectionSubtitle, 
  sectionDescription, 
  highlightLabel 
}) {
  const { aboutMe: storeAboutMe, fetchAboutMe } = usePortfolioStore();
  const [education, setEducation] = useState([]);
  
  useEffect(() => {
    fetchAboutMe();
    fetchEducation();
  }, [fetchAboutMe]);

  const fetchEducation = async () => {
    try {
      const data = await portfolioAPI.getAllEducation();
      setEducation(data);
    } catch (error) {
      console.error('Error fetching education:', error);
    }
  };

  // Use backend data
  const aboutMe = aboutMeData || (storeAboutMe?.title ? {
    title: storeAboutMe.title || "About Me",
    introduction: storeAboutMe.description || "",
    paragraphs: storeAboutMe.bio ? storeAboutMe.bio.split('\n\n').filter(p => p.trim()) : [],
    highlights: []
  } : null);
  
  const educationList = educationData || education;
  const title = sectionTitle || "About Me & Education";
  const subtitle = sectionSubtitle || "Get to know me better";
  const description = sectionDescription || "Learn about my background, journey, and what drives me as a developer.";
  const highlightsLabel = highlightLabel || "Highlights:";

  // Don't render if no data
  if (!aboutMe && educationList.length === 0) {
    return null;
  }

  return (
    <div id="me" className="bg-base-200 py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Main Header */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h2>
          <p className="text-sm sm:text-base text-base-content/60">{subtitle}</p>
          <p className="text-sm sm:text-base text-base-content/80 mt-2">{description}</p>
        </div>

        {/* About Me Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="bg-base-100 rounded-lg p-4 sm:p-6 md:p-8 shadow-sm mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{aboutMe.title}</h3>
            
            <p className="text-base sm:text-lg text-base-content/90 mb-4 sm:mb-6 leading-relaxed">
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
          {aboutMe.highlights && aboutMe.highlights.length > 0 && (
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
          )}
        </div>

        {/* Education Section */}
        {educationList && educationList.length > 0 && (
          <>
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-8 text-center">Education</h3>
            </div>

            <div className="space-y-8">
              {educationList.map((edu, index) => (
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
                  
                  {edu.achievements && edu.achievements.length > 0 && (
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
                  )}
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Me