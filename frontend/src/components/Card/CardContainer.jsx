import React from 'react'
import Card from './Card'

function CardContainer({ projects }) {
  return (
    <div className="w-full flex justify-center px-4 py-8">
        <div className="carousel carousel-center rounded-box w-full max-w-[320px] md:max-w-[688px] lg:max-w-[1024px] space-x-4 p-4">
            {projects.map((project) => (
              <div key={project.id} className="carousel-item">
                  <Card project={project} />
              </div>
            ))}
        </div>
    </div>
  )
}

export default CardContainer