import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [skills, setSkills] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    const storedBlogs = localStorage.getItem('blogPosts');
    const storedProjects = localStorage.getItem('projects');
    const storedCerts = localStorage.getItem('certifications');
    const storedSkills = localStorage.getItem('skills');

    if (storedAuth === 'true') setIsAuthenticated(true);
    if (storedBlogs) setBlogPosts(JSON.parse(storedBlogs));
    if (storedProjects) setProjects(JSON.parse(storedProjects));
    if (storedCerts) setCertifications(JSON.parse(storedCerts));
    if (storedSkills) setSkills(JSON.parse(storedSkills));
  }, []);

  // Auth functions
  const login = (email, password) => {
    // Simple email and password check (in production, this should be backend-based)
    // Default credentials: admin@portfolio.com / admin123
    if (email === 'admin@portfolio.com' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminEmail', email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  // Blog CRUD
  const addBlogPost = (post) => {
    const newPost = { ...post, id: Date.now() };
    const updated = [...blogPosts, newPost];
    setBlogPosts(updated);
    localStorage.setItem('blogPosts', JSON.stringify(updated));
    return newPost;
  };

  const updateBlogPost = (id, updatedPost) => {
    const updated = blogPosts.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    );
    setBlogPosts(updated);
    localStorage.setItem('blogPosts', JSON.stringify(updated));
  };

  const deleteBlogPost = (id) => {
    const updated = blogPosts.filter(post => post.id !== id);
    setBlogPosts(updated);
    localStorage.setItem('blogPosts', JSON.stringify(updated));
  };

  // Project CRUD
  const addProject = (project) => {
    const newProject = { ...project, id: Date.now() };
    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem('projects', JSON.stringify(updated));
    return newProject;
  };

  const updateProject = (id, updatedProject) => {
    const updated = projects.map(proj => 
      proj.id === id ? { ...proj, ...updatedProject } : proj
    );
    setProjects(updated);
    localStorage.setItem('projects', JSON.stringify(updated));
  };

  const deleteProject = (id) => {
    const updated = projects.filter(proj => proj.id !== id);
    setProjects(updated);
    localStorage.setItem('projects', JSON.stringify(updated));
  };

  // Certification CRUD
  const addCertification = (cert) => {
    const newCert = { ...cert, id: Date.now() };
    const updated = [...certifications, newCert];
    setCertifications(updated);
    localStorage.setItem('certifications', JSON.stringify(updated));
    return newCert;
  };

  const updateCertification = (id, updatedCert) => {
    const updated = certifications.map(cert => 
      cert.id === id ? { ...cert, ...updatedCert } : cert
    );
    setCertifications(updated);
    localStorage.setItem('certifications', JSON.stringify(updated));
  };

  const deleteCertification = (id) => {
    const updated = certifications.filter(cert => cert.id !== id);
    setCertifications(updated);
    localStorage.setItem('certifications', JSON.stringify(updated));
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    // Blog
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    // Projects
    projects,
    addProject,
    updateProject,
    deleteProject,
    // Certifications
    certifications,
    addCertification,
    updateCertification,
    deleteCertification,
    // Skills
    skills,
    setSkills
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
