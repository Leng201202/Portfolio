import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ThemeController from './ThemeController'

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1 ml-5">
            <div className="avatar">
                <div className="w-12 rounded-full mr-1">
                    <img src="/PortfolioLogo.png" width="40px" height="40px" alt="Portfolio Logo" style={{filter: 'brightness(0) saturate(100%) invert(80%)'}} />
                </div>
            </div>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
                <li><a onClick={() => scrollToSection('me')} style={{cursor: 'pointer'}}>Me</a></li>
                <li><a onClick={() => scrollToSection('projects')} style={{cursor: 'pointer'}}>Project Experience</a></li>
                <li><a onClick={() => scrollToSection('certifications')} style={{cursor: 'pointer'}}>Certifications</a></li>
                <li><a onClick={() => navigate('/blog')} style={{cursor: 'pointer'}}>Blog</a></li>
                <li>
                  <details>
                    <summary>More</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li><a onClick={() => navigate('/admin')}>Admin</a></li>
                    </ul>
                  </details>
                </li>
                <li><ThemeController /></li>

            </ul>
        </div>
    </div>
  )
}

export default NavBar