import React, { useState } from 'react';
import usePortfolioStore from '../../store/usePortfolioStore';
import { uploadToCloudinary, getCloudinaryConfig } from '../../utils/cloudinaryUpload';

function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = usePortfolioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Your Name',
    category: 'Web Development',
    tags: '',
    image: '',
    readTime: '5 min read'
  });

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'Your Name',
      category: 'Web Development',
      tags: '',
      image: '',
      readTime: '5 min read'
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      date: new Date().toISOString().split('T')[0]
    };

    if (isEditing) {
      updateBlogPost(editingId, postData);
    } else {
      addBlogPost(postData);
    }
    
    resetForm();
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      image: post.image,
      readTime: post.readTime
    });
    setEditingId(post.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
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
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Title *</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Category *</span>
                </label>
                <select
                  className="select select-bordered focus:select-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Web Development</option>
                  <option>Backend</option>
                  <option>Database</option>
                  <option>Design</option>
                  <option>DevOps</option>
                  <option>Mobile</option>
                </select>
              </div>
            </div>

            <div className="form-control gap-2">
              <label className="label mb-2">
                <span className="label-text font-semibold text-sm">Excerpt *</span>
              </label>
              <textarea
                className="textarea textarea-bordered focus:textarea-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200 leading-relaxed"
                rows="3"
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                placeholder="Brief summary of your blog post..."
                required
              />
            </div>

            <div className="form-control gap-2">
              <label className="label mb-2">
                <span className="label-text font-semibold text-sm">Content *</span>
                <span className="label-text-alt text-base-content/50">Markdown-style formatting supported</span>
              </label>
              <textarea
                className="textarea textarea-bordered focus:textarea-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200 font-mono text-sm leading-relaxed"
                rows="16"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Use ### for headings, - for lists, ``` for code blocks"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Author</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  placeholder="Your Name"
                />
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Read Time</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.readTime}
                  onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                  placeholder="5 min read"
                />
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Tags (comma-separated)</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="React, Node.js, API"
                />
              </div>
            </div>

            <div className="form-control gap-2">
              <label className="label mb-2">
                <span className="label-text font-semibold text-sm">Blog Image</span>
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
                {isEditing ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">All Blog Posts ({blogPosts.length})</h2>
          
          {blogPosts.length === 0 ? (
            <div className="text-center py-8 text-base-content/60">
              No blog posts yet. Create your first post above!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{post.title}</div>
                            <div className="text-sm opacity-50">{post.excerpt.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-primary badge-sm">{post.category}</span>
                      </td>
                      <td>{post.date}</td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            className="btn btn-ghost btn-xs"
                            onClick={() => handleEdit(post)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-ghost btn-xs text-error"
                            onClick={() => handleDelete(post.id)}
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

export default BlogManager;
