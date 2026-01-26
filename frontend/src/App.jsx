import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'

import CertificationsDetails from './pages/Certifications/CertificationsDetails'
import ProjectDetailsPage from './pages/Project/ProjectDetailsPage'
import { Blog } from './pages/Blog/Blog'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminRegister from './pages/Admin/AdminRegister'
import AdminDashboard from './pages/Admin/AdminDashboard'
import usePortfolioStore from './store/usePortfolioStore'

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = usePortfolioStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/certifications/:id" element={<CertificationsDetails />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
