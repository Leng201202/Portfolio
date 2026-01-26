import API_BASE_URL from './config';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to create headers
const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Portfolio API calls
export const portfolioAPI = {
  // Profile Data
  getProfileData: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolio/profile`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }
    
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },

  updateProfileData: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/profile/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update profile data');
    }
    
    return response.json();
  },

  createProfileData: async (data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/profile`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create profile data');
    }
    
    return response.json();
  },

  // Blog Posts
  getAllBlogPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolio/blogs`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    return response.json();
  },

  getBlogPost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/blogs/${id}`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }
    
    return response.json();
  },

  createBlogPost: async (data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/blogs`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create blog post');
    }
    
    return response.json();
  },

  updateBlogPost: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/blogs/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update blog post');
    }
    
    return response.json();
  },

  deleteBlogPost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/blogs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete blog post');
    }
    
    return response.json();
  },

  // Projects
  getAllProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolio/projects`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return response.json();
  },

  getProject: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/projects/${id}`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    
    return response.json();
  },

  createProject: async (data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/projects`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    
    return response.json();
  },

  updateProject: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update project');
    }
    
    return response.json();
  },

  deleteProject: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    
    return response.json();
  },

  // Skills
  getAllSkills: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolio/skills`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }
    
    return response.json();
  },

  createSkill: async (data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/skills`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create skill');
    }
    
    return response.json();
  },

  updateSkill: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/skills/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update skill');
    }
    
    return response.json();
  },

  deleteSkill: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/skills/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete skill');
    }
    
    return response.json();
  },

  // Skill Categories
  getAllSkillCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolio/skill-categories`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch skill categories');
    }
    
    return response.json();
  },

  createSkillCategory: async (data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/skill-categories`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create skill category');
    }
    
    return response.json();
  },

  updateSkillCategory: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/skill-categories/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update skill category');
    }
    
    return response.json();
  },

  deleteSkillCategory: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/skill-categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete skill category');
    }
    
    return response.json();
  },

  // Certifications
  getAllCertifications: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolio/certifications`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch certifications');
    }
    
    return response.json();
  },

  getCertification: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/certifications/${id}`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch certification');
    }
    
    return response.json();
  },

  createCertification: async (data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/certifications`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create certification');
    }
    
    return response.json();
  },

  updateCertification: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/certifications/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update certification');
    }
    
    return response.json();
  },

  deleteCertification: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/certifications/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete certification');
    }
    
    return response.json();
  },

  // Education
  getAllEducation: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolio/education`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch education');
    }
    
    return response.json();
  },

  getEducation: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/education/${id}`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch education');
    }
    
    return response.json();
  },

  createEducation: async (data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/education`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create education');
    }
    
    return response.json();
  },

  updateEducation: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/education/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update education');
    }
    
    return response.json();
  },

  deleteEducation: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/education/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete education');
    }
    
    return response.json();
  },

  // About Me
  getAboutMe: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolio/about`, {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch about me');
    }
    
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },

  createAboutMe: async (data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/about`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create about me');
    }
    
    return response.json();
  },

  updateAboutMe: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/about/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update about me');
    }
    
    return response.json();
  },
};
