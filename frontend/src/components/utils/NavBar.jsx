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
        <div className="flex-1 ml-2 md:ml-5">
            <div className="avatar">
                <div className="w-10 md:w-12 rounded-full mr-1">
                    <img src="/PortfolioLogo.png" width="40px" height="40px" alt="Portfolio Logo" style={{filter: 'brightness(0) saturate(100%) invert(80%)'}} />
                </div>
            </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal px-1">
                <li><a onClick={() => scrollToSection('me')} style={{cursor: 'pointer'}}>Me</a></li>
                <li><a onClick={() => scrollToSection('projects')} style={{cursor: 'pointer'}}>Project Experience</a></li>
                <li><a onClick={() => scrollToSection('certifications')} style={{cursor: 'pointer'}}>Certifications</a></li>
                <li><a onClick={() => navigate('/blog')} style={{cursor: 'pointer'}}>Blog</a></li>
                <li><ThemeController /></li>
            </ul>
        </div>

        {/* Mobile Menu */}
        <div className="flex-none lg:hidden">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => scrollToSection('me')}>Me</a></li>
                <li><a onClick={() => scrollToSection('projects')}>Projects</a></li>
                <li><a onClick={() => scrollToSection('certifications')}>Certifications</a></li>
                <li><a onClick={() => navigate('/blog')}>Blog</a></li>
                <li className="border-t border-base-300 mt-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span>Theme</span>
                    <ThemeController />
                  </div>
                </li>
              </ul>
            </div>
        </div>
    </div>
  )
}

export default NavBar