import React from 'react'
import ThemeController from './ThemeController'

function NavBar() {
  return (
    <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
            <div className="avatar">
                <div className="w-12 rounded-full mr-1">
                    <img src="/Portfolio.png" width="40px" height="40px" alt="Portfolio Logo" />
                </div>
            </div>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
                <li><a>Me</a></li>
                <li><a>Project Experience</a></li>
                <li><a>Certifications</a></li>
                <li><ThemeController /></li>

            </ul>
        </div>
    </div>
  )
}

export default NavBar