import React, { useEffect, useState } from 'react'
import { portfolioAPI } from '../../api'

function Skill() {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await portfolioAPI.getAllSkills();
      
      // Group skills by category
      const groupedSkills = {};
      data.forEach(skill => {
        const categoryName = skill.category?.name || 'Other';
        if (!groupedSkills[categoryName]) {
          groupedSkills[categoryName] = [];
        }
        groupedSkills[categoryName].push(skill.name);
      });
      
      setSkills(groupedSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-base-200 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  if (Object.keys(skills).length === 0) {
    return null;
  }

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