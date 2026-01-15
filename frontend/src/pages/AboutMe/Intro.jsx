import React from 'react'

function Intro({ profileData }) {
  // Default profile data - can be overridden by passing profileData prop
  const defaultData = {
    greeting: "Hello, I'm",
    name: "Your Name",
    title: "Full Stack Developer",
    description: "I'm a passionate developer with expertise in building modern web applications. I love creating beautiful, functional, and user-friendly interfaces that solve real-world problems. With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean code and elegant design.",
    image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    imageAlt: "Profile",
    availableForWork: true,
    socialLinks: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  };

  const profile = profileData || defaultData;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <p className="text-primary font-semibold text-lg">{profile.greeting}</p>
              <h1 className="text-5xl sm:text-6xl font-bold text-base-content">
                {profile.name}
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-accent">
                {profile.title}
              </h2>
            </div>
            
            <p className="text-lg text-base-content/80 leading-relaxed">
              {profile.description}
            </p>

            <div className="flex gap-4 pt-4">
              <button className="btn btn-primary btn-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Me
              </button>
              <button className="btn btn-outline btn-lg">
                Download CV
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a href={profile.socialLinks.github} className="btn btn-circle btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href={profile.socialLinks.linkedin} className="btn btn-circle btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href={profile.socialLinks.twitter} className="btn btn-circle btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Section - Photo */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl transform rotate-6 scale-95 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-accent to-primary rounded-3xl transform -rotate-6 scale-95 opacity-20"></div>
              
              {/* Photo container */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-base-300">
                <img 
                  src={profile.image} 
                  alt={profile.imageAlt} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Floating badge */}
              {profile.availableForWork && (
                <div className="absolute -bottom-4 -right-4 badge badge-lg badge-primary shadow-lg px-6 py-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Available for Work
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intro