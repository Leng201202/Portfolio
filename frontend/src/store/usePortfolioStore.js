import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePortfolioStore = create(
  persist(
    (set) => ({
      // Intro Section
      introSection: {
        greeting: "Hello, I'm",
        name: 'Your Name',
        tagline: 'Full Stack Developer',
        description: "I'm a passionate developer with expertise in building modern web applications. I love creating beautiful, functional, and user-friendly interfaces that solve real-world problems. With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean code and elegant design.",
        profileImage: '',
        resumeUrl: '',
        ctaText: 'Contact Me',
        ctaLink: 'mailto:your@email.com',
      },
      
      // About Me Section
      aboutMe: {
        title: 'About Me',
        description: 'Short description about yourself',
        bio: 'Your detailed biography, career journey, passions, etc.',
        location: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        twitter: '',
      },
      
      // Skills
      skills: [],
      
      // Blog Posts
      blogPosts: [],
      
      // Projects
      projects: [],
      
      // Certifications
      certifications: [],
      
      // Auth
      isAuthenticated: false,
      
      // Actions for Intro Section
      updateIntroSection: (data) =>
        set((state) => ({
          introSection: { ...state.introSection, ...data },
        })),
      
      // Actions for About Me
      updateAboutMe: (data) =>
        set((state) => ({
          aboutMe: { ...state.aboutMe, ...data },
        })),
      
      // Actions for Skills
      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, { ...skill, id: Date.now() }],
        })),
      
      updateSkill: (id, updatedSkill) =>
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === id ? { ...skill, ...updatedSkill } : skill
          ),
        })),
      
      deleteSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((skill) => skill.id !== id),
        })),
      
      // Actions for Blog Posts
      addBlogPost: (post) =>
        set((state) => ({
          blogPosts: [
            ...state.blogPosts,
            { ...post, id: Date.now(), date: new Date().toISOString() },
          ],
        })),
      
      updateBlogPost: (id, updatedPost) =>
        set((state) => ({
          blogPosts: state.blogPosts.map((post) =>
            post.id === id ? { ...post, ...updatedPost } : post
          ),
        })),
      
      deleteBlogPost: (id) =>
        set((state) => ({
          blogPosts: state.blogPosts.filter((post) => post.id !== id),
        })),
      
      // Actions for Projects
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { ...project, id: Date.now() }],
        })),
      
      updateProject: (id, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedProject } : project
          ),
        })),
      
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
      
      // Actions for Certifications
      addCertification: (cert) =>
        set((state) => ({
          certifications: [...state.certifications, { ...cert, id: Date.now() }],
        })),
      
      updateCertification: (id, updatedCert) =>
        set((state) => ({
          certifications: state.certifications.map((cert) =>
            cert.id === id ? { ...cert, ...updatedCert } : cert
          ),
        })),
      
      deleteCertification: (id) =>
        set((state) => ({
          certifications: state.certifications.filter((cert) => cert.id !== id),
        })),
      
      // Auth Actions
      login: (email, password) => {
        // Simple authentication check
        if (email === 'admin@portfolio.com' && password === 'admin123') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'portfolio-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these fields
        introSection: state.introSection,
        aboutMe: state.aboutMe,
        skills: state.skills,
        blogPosts: state.blogPosts,
        projects: state.projects,
        certifications: state.certifications,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default usePortfolioStore;
