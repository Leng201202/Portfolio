import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({ project }) {
  const navigate = useNavigate();

  return (
    <div 
      className="card bg-base-100 w-72 sm:w-80 flex-shrink-0 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
      onClick={() => navigate(`/projects/${project.id}`)}
    >
        <figure className="h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp';
              }}
            />
        </figure>
        <div className="card-body">
            <h2 className="card-title group-hover:text-primary transition-colors">
              {project.title}
            </h2>
            <p className="text-base-content/70 line-clamp-2">{project.description}</p>
            <div className="card-actions justify-end mt-2">
              {project.technologies?.map((tech, idx) => (
                <div key={idx} className="badge badge-outline">{tech}</div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Card