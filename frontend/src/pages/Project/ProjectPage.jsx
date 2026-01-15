import React from 'react'
import CardContainer from '../../components/Card/CardContainer'

function ProjectPage({ projectsData }) {
  // Default projects data - can be overridden by passing projectsData prop
  const defaultProjects = [
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

  const projects = projectsData || defaultProjects;

  return (
    <div id="projects" className="bg-base-200 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-3">Projects</h2>
          <p className="text-base-content/60">A showcase of my recent work and side projects</p>
        </div>

        {/* Projects Carousel */}
        <CardContainer projects={projects} />

      </div>
    </div>
  )
}

export default ProjectPage