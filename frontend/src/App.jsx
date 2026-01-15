import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'

import CertificationsDetails from './pages/Certifications/CertificationsDetails'
import ProjectDetailsPage from './pages/Project/ProjectDetailsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/certifications/:id" element={<CertificationsDetails />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
      </Routes>
    </Router>
  )
}

export default App
