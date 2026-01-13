import Footer from '../components/utils/Footer'
import NavBar from '../components/utils/NavBar'
import Me from './AboutMe/Me'
import Skill from './AboutMe/Skill'
import ProjectPage from './Project/ProjectPage'

function HomePage() {
  return (
    <div className="bg-base-200">
        <NavBar />
        <Me />
        <Skill />
        <ProjectPage />
        <Footer />
    </div>
  )
}

export default HomePage