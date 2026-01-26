import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../api';
import { uploadToCloudinary, getCloudinaryConfig } from '../../utils/cloudinaryUpload';

function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    githubUrl: '',
    liveUrl: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await portfolioAPI.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: '',
      githubUrl: '',
      liveUrl: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(t => t)
      };

      if (isEditing) {
        await portfolioAPI.updateProject(editingId, projectData);
      } else {
        await portfolioAPI.createProject(projectData);
      }
      
      await fetchProjects();
      resetForm();
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      technologies: project.technologies?.join(', ') || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || ''
    });
    setEditingId(project.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await portfolioAPI.deleteProject(id);
        await fetchProjects();
        alert('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const { cloudName, uploadPreset } = getCloudinaryConfig();
      const imageUrl = await uploadToCloudinary(file, cloudName, uploadPreset);
      setFormData({ ...formData, image: imageUrl });
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {isEditing ? 'Edit Project' : 'Create New Project'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control gap-2">
              <label className="label mb-2">
                <span className="label-text font-semibold">Title *</span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:input-primary transition-all duration-200"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="form-control gap-2">
              <label className="label mb-2">
                <span className="label-text font-semibold text-sm">Description *</span>
              </label>
              <textarea
                className="textarea textarea-bordered focus:textarea-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200 leading-relaxed"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of your project..."
                required
              />
            </div>

            <div className="form-control gap-2">
              <label className="label mb-2">
                <span className="label-text font-semibold text-sm">Technologies (comma-separated)</span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                value={formData.technologies}
                onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                placeholder="React, Express, MongoDB"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">GitHub URL</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Live Demo URL</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                  placeholder="https://demo.example.com"
                />
              </div>
            </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Project Image</span>
                  <span className="label-text-alt text-base-content/50">Upload to Cloudinary</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered focus:file-input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                {isUploading && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Uploading to Cloudinary...</span>
                  </div>
                )}
                {formData.image && !isUploading && (
                  <div className="mt-2 relative inline-block">
                    <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, image: ''})}
                      className="btn btn-circle btn-xs btn-error absolute -top-2 -right-2"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

            <div className="card-actions justify-end gap-2">
              {isEditing && (
                <button type="button" className="btn" onClick={resetForm}>
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Projects List */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">All Projects ({projects.length})</h2>
          
          {projects.length === 0 ? (
            <div className="text-center py-8 text-base-content/60">
              No projects yet. Create your first project above!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Technologies</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{project.title}</div>
                            <div className="text-sm opacity-50">{project.description?.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge badge-sm ${
                          project.status === 'NEW' ? 'badge-secondary' :
                          project.status === 'UPCOMING' ? 'badge-info' :
                          project.status === 'IN_PROGRESS' ? 'badge-warning' :
                          'badge-success'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {project.tags?.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="badge badge-outline badge-xs">{tag}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            className="btn btn-ghost btn-xs"
                            onClick={() => handleEdit(project)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-ghost btn-xs text-error"
                            onClick={() => handleDelete(project.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectManager;
