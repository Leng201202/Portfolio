import React, { useEffect, useState } from 'react'
import CardContainer from '../../components/Card/CardContainer'
import { portfolioAPI } from '../../api'

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await portfolioAPI.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-base-200 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div id="projects" className="bg-base-200 py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Projects</h2>
          <p className="text-sm sm:text-base text-base-content/60">A showcase of my recent work and side projects</p>
        </div>

        {/* Projects Carousel */}
        {projects.length > 0 ? (
          <CardContainer projects={projects} />
        ) : (
          <div className="text-center py-12">
            <p className="text-base-content/60">No projects available yet. Add projects through the admin dashboard.</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProjectPage