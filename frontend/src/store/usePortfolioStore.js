import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { portfolioAPI, authAPI } from '../api';

const usePortfolioStore = create(
  persist(
    (set) => ({
      // Intro Section
      introSection: {
        greeting: '',
        name: '',
        tagline: '',
        description: '',
        profileImage: '',
        resumeUrl: '',
        ctaText: '',
        ctaLink: '',
        availableForWork: false
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
      updateIntroSection: async (data) => {
        try {
          const existingData = await portfolioAPI.getProfileData();
          
          // Map frontend fields to backend schema
          const backendData = {
            greeting: data.greeting || 'Hello',
            name: data.name || 'Your Name',
            title: data.tagline || 'Developer', // frontend: tagline -> backend: title
            description: data.description || 'About me',
            image: data.profileImage || '', // frontend: profileImage -> backend: image
            imageAlt: 'Profile',
            availableForWork: data.availableForWork !== undefined ? data.availableForWork : false,
            githubUrl: data.githubUrl || '', 
            linkedinUrl: data.linkedinUrl || '', 
            resumeUrl: data.resumeUrl || '',
            ctaText: data.ctaText || '',
            ctaLink: data.ctaLink || '',
          };
          
          let updatedData;
          
          if (existingData && existingData.id) {
            // Update existing record
            updatedData = await portfolioAPI.updateProfileData(existingData.id, backendData);
          } else {
            // Create new record
            updatedData = await portfolioAPI.createProfileData(backendData);
          }
          
          // Update local state with response
          set((state) => ({
            introSection: {
              ...state.introSection,
              greeting: updatedData.greeting || '',
              name: updatedData.name || '',
              tagline: updatedData.title || '',
              description: updatedData.description || '',
              profileImage: updatedData.image || '',
              availableForWork: updatedData.availableForWork || false,
              resumeUrl: updatedData.resumeUrl || '',
              ctaText: updatedData.ctaText || '',
              ctaLink: updatedData.ctaLink || '',
              githubUrl: updatedData.githubUrl || '',
              linkedinUrl: updatedData.linkedinUrl || '',
            },
          }));
          return updatedData;
        } catch (error) {
          console.error('Failed to update intro section:', error);
          // Fallback to local update if API fails
          set((state) => ({
            introSection: { ...state.introSection, ...data },
          }));
          throw error;
        }
      },

      fetchIntroSection: async () => {
        try {
          const profileData = await portfolioAPI.getProfileData();
          if (profileData) {
            set((state) => ({
              introSection: {
                ...state.introSection,
                greeting: profileData.greeting || '',
                name: profileData.name || '',
                tagline: profileData.title || '',
                description: profileData.description || '',
                profileImage: profileData.image || '',
                availableForWork: profileData.availableForWork || false,
                resumeUrl: profileData.resumeUrl || '',
                ctaText: profileData.ctaText || '',
                ctaLink: profileData.ctaLink || '',
                githubUrl: profileData.githubUrl || '',
                linkedinUrl: profileData.linkedinUrl || '',
              },
            }));
          }
        } catch (error) {
          console.error('Failed to fetch intro section:', error);
        }
      },
      
      // Actions for About Me
      updateAboutMe: async (data) => {
        try {
          const existingData = await portfolioAPI.getAboutMe();
          let updatedData;
          
          if (existingData && existingData.id) {
            // Update existing record
            updatedData = await portfolioAPI.updateAboutMe(existingData.id, data);
          } else {
            // Create new record
            updatedData = await portfolioAPI.createAboutMe(data);
          }
          
          set({ aboutMe: updatedData });
          return updatedData;
        } catch (error) {
          console.error('Failed to update about me:', error);
          throw error;
        }
      },
      
      fetchAboutMe: async () => {
        try {
          const aboutMe = await portfolioAPI.getAboutMe();
          if (aboutMe) {
            set({ aboutMe });
          }
        } catch (error) {
          console.error('Failed to fetch about me:', error);
        }
      },
      
      // Actions for Skills
      addSkill: async (skill) => {
        try {
          const newSkill = await portfolioAPI.createSkill(skill);
          set((state) => ({
            skills: [...state.skills, newSkill],
          }));
          return newSkill;
        } catch (error) {
          console.error('Failed to add skill:', error);
          throw error;
        }
      },
      
      updateSkill: async (id, updatedSkill) => {
        try {
          const updated = await portfolioAPI.updateSkill(id, updatedSkill);
          set((state) => ({
            skills: state.skills.map((skill) =>
              skill.id === id ? updated : skill
            ),
          }));
          return updated;
        } catch (error) {
          console.error('Failed to update skill:', error);
          throw error;
        }
      },
      
      deleteSkill: async (id) => {
        try {
          await portfolioAPI.deleteSkill(id);
          set((state) => ({
            skills: state.skills.filter((skill) => skill.id !== id),
          }));
        } catch (error) {
          console.error('Failed to delete skill:', error);
          throw error;
        }
      },

      fetchSkills: async () => {
        try {
          const skills = await portfolioAPI.getAllSkills();
          set({ skills });
          return skills;
        } catch (error) {
          console.error('Failed to fetch skills:', error);
          throw error;
        }
      },
      
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
      login: async (email, password) => {
        try {
          const response = await authAPI.login(email, password);
          localStorage.setItem('token', response.access_token);
          set({ isAuthenticated: true });
          return response;
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },
      
      logout: () => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false });
      },
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
