import Footer from '../components/utils/Footer'
import NavBar from '../components/utils/NavBar'
import Intro from './AboutMe/Intro'
import Me from './AboutMe/Me'
import Skill from './AboutMe/Skill'
import CertificationPage from './Certifications/CertificationPage'
import ProjectPage from './Project/ProjectPage'

function HomePage() {
  return (
    <div className="bg-base-200">
        <NavBar />
        <Intro />
        <Me />
        <CertificationPage />
        <Skill />
        <ProjectPage />
        <Footer />
    </div>
  )
}

export default HomePage