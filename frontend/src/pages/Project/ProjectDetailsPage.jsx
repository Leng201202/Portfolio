import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../../components/utils/NavBar'
import Footer from '../../components/utils/Footer'

function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // This should match the data from ProjectPage
  const projectsData = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform with React, Node.js, and PostgreSQL featuring user authentication, product management, and payment integration.",
      image: "/projects/ecommerce.jpg",
      tags: ["React", "Node.js", "PostgreSQL"],
      isNew: true,
      github: "https://github.com/yourusername/ecommerce",
      demo: "https://ecommerce-demo.com",
      technologies: ["React", "Node.js", "Express", "PostgreSQL", "Stripe", "TailwindCSS"],
      features: [
        "User authentication and authorization",
        "Product catalog with search and filters",
        "Shopping cart and checkout process",
        "Payment integration with Stripe",
        "Admin dashboard for product management"
      ],
      challenges: "Implementing secure payment processing and managing complex state across the application.",
      learned: "Gained expertise in payment gateway integration, state management with Redux, and database optimization."
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
      image: "/projects/taskmanager.jpg",
      tags: ["React", "Firebase", "Redux"],
      isNew: true,
      github: "https://github.com/yourusername/task-manager",
      demo: "https://taskmanager-demo.com",
      technologies: ["React", "Firebase", "Redux", "Material-UI"],
      features: [
        "Real-time task updates",
        "Team collaboration",
        "Project and task tracking",
        "Drag-and-drop interface",
        "Notifications and reminders"
      ],
      challenges: "Implementing real-time synchronization and managing offline functionality.",
      learned: "Mastered Firebase real-time database, WebSockets, and optimistic UI updates."
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A modern weather dashboard displaying current conditions, forecasts, and weather maps using external APIs.",
      image: "/projects/weather.jpg",
      tags: ["React", "API", "Charts"],
      isNew: false,
      github: "https://github.com/yourusername/weather-dashboard",
      demo: "https://weather-demo.com",
      technologies: ["React", "OpenWeather API", "Chart.js", "TailwindCSS"],
      features: [
        "Current weather conditions",
        "7-day forecast",
        "Interactive weather maps",
        "Location search",
        "Temperature charts and graphs"
      ],
      challenges: "Handling API rate limits and displaying complex weather data in an intuitive way.",
      learned: "Improved skills in API integration, data visualization, and responsive design."
    },
    {
      id: 4,
      title: "Blog Platform",
      description: "A full-featured blog platform with markdown support, comments, and user profiles built with Next.js.",
      image: "/projects/blog.jpg",
      tags: ["Next.js", "MongoDB", "MDX"],
      isNew: false,
      github: "https://github.com/yourusername/blog-platform",
      demo: "https://blog-demo.com",
      technologies: ["Next.js", "MongoDB", "NextAuth", "MDX", "TailwindCSS"],
      features: [
        "Markdown blog posts",
        "User authentication",
        "Comments and reactions",
        "User profiles",
        "SEO optimized"
      ],
      challenges: "Implementing SEO optimization and server-side rendering for dynamic content.",
      learned: "Deepened understanding of Next.js, SSR/SSG, and SEO best practices."
    },
    {
      id: 5,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media metrics with data visualization and reporting features.",
      image: "/projects/dashboard.jpg",
      tags: ["React", "D3.js", "Analytics"],
      isNew: false,
      github: "https://github.com/yourusername/social-dashboard",
      demo: "https://dashboard-demo.com",
      technologies: ["React", "D3.js", "Node.js", "MongoDB"],
      features: [
        "Real-time analytics",
        "Data visualization with charts",
        "Multi-platform integration",
        "Custom reporting",
        "Export data functionality"
      ],
      challenges: "Creating performant visualizations with large datasets and real-time updates.",
      learned: "Advanced D3.js techniques, data aggregation, and performance optimization."
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Mobile-responsive fitness tracking application with workout logging, progress tracking, and goal setting.",
      image: "/projects/fitness.jpg",
      tags: ["React Native", "Mobile", "Health"],
      isNew: false,
      github: "https://github.com/yourusername/fitness-tracker",
      demo: "https://fitness-demo.com",
      technologies: ["React Native", "Firebase", "Charts", "Expo"],
      features: [
        "Workout logging",
        "Progress tracking",
        "Goal setting and reminders",
        "Exercise library",
        "Statistics and charts"
      ],
      challenges: "Ensuring smooth mobile performance and handling offline data synchronization.",
      learned: "Mobile development best practices, native features integration, and cross-platform optimization."
    }
  ];

  const project = projectsData.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="bg-base-200">
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Go Back Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-base-200">
      <NavBar />
      
      <div className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')}
            className="btn btn-ghost btn-sm mb-8 gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          {/* Project Details Card */}
          <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
            
            {/* Header */}
            <div className="p-8 pb-6 border-b border-base-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, idx) => (
                      <span key={idx} className="badge badge-primary badge-outline">
                        {tag}
                      </span>
                    ))}
                    {project.isNew && (
                      <span className="badge badge-secondary">NEW</span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-base-content/80 text-lg leading-relaxed">{project.description}</p>
            </div>

            {/* Project Image */}
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp';
                }}
              />
            </div>

            {/* Details Content */}
            <div className="p-8">
              
              {/* Links */}
              <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-base-300">
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Code
                  </a>
                )}
                {project.demo && (
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="badge badge-lg badge-outline px-4 py-3"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                  <ul className="space-y-3">
                    {project.features.map((feature, idx) => (
                      <li 
                        key={idx}
                        className="flex items-start gap-3 text-base-content/80"
                      >
                        <span className="text-success mt-1 flex-shrink-0">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges & Learning */}
              <div className="grid md:grid-cols-2 gap-6">
                {project.challenges && (
                  <div className="bg-base-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Challenges
                    </h3>
                    <p className="text-base-content/70">{project.challenges}</p>
                  </div>
                )}
                {project.learned && (
                  <div className="bg-base-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      What I Learned
                    </h3>
                    <p className="text-base-content/70">{project.learned}</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProjectDetailsPage