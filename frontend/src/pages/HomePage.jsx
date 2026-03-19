import React, { useEffect, useState } from 'react'
import Footer from '../components/utils/Footer'
import NavBar from '../components/utils/NavBar'
import Intro from './AboutMe/Intro'
import Me from './AboutMe/Me'
import Skill from './AboutMe/Skill'
import CertificationPage from './Certifications/CertificationPage'
import ProjectPage from './Project/ProjectPage'
import { portfolioAPI } from '../api'

function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await portfolioAPI.getHomeData();
        setHomeData(data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center space-y-4">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="text-base-content/60 font-medium">Loading Portfolio...</p>
      </div>
    );
  }

  // Fallback to empty objects if fetch fails or data is missing
  const { profile = null, about = null, education = [], skills = [], certifications = [], projects = [] } = homeData || {};

  return (
    <div className="bg-base-200">
        <NavBar />
        <Intro profileData={profile} aboutMeData={about} />
        <Me aboutMeData={about} educationData={education} />
        <CertificationPage certificationsData={certifications} />
        <Skill skillsData={skills} />
        <ProjectPage projectsData={projects} />
        <Footer />
    </div>
  )
}

export default HomePage