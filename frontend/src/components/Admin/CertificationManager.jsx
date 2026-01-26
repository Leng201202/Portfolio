import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../api';
import { uploadToCloudinary, getCloudinaryConfig } from '../../utils/cloudinaryUpload';

function CertificationManager() {
  const [certifications, setCertifications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    description: '',
    image: '',
    credentialUrl: ''
  });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const data = await portfolioAPI.getAllCertifications();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      issuer: '',
      date: '',
      description: '',
      image: '',
      credentialUrl: ''
    });
    setImagePreview('');
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const dataToSubmit = {
        ...formData,
        date: new Date(formData.date).toISOString()
      };

      if (isEditing) {
        await portfolioAPI.updateCertification(editingId, dataToSubmit);
      } else {
        await portfolioAPI.createCertification(dataToSubmit);
      }
      
      await fetchCertifications();
      resetForm();
      alert('Certification saved successfully!');
    } catch (error) {
      console.error('Error saving certification:', error);
      alert('Failed to save certification. Please try again.');
    }
  };

  const handleEdit = (cert) => {
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      date: new Date(cert.date).toISOString().split('T')[0],
      description: cert.description || '',
      image: cert.image || '',
      credentialUrl: cert.credentialUrl || ''
    });
    setImagePreview(cert.image || '');
    setEditingId(cert.id);
    setIsEditing(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setIsUploading(true);
      
      try {
        const config = getCloudinaryConfig();
        const imageUrl = await uploadToCloudinary(file, config.cloudName, config.uploadPreset);
        
        setFormData({...formData, image: imageUrl});
        setImagePreview(imageUrl);
        
        alert('Image uploaded successfully!');
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload image. Please check your Cloudinary configuration in .env file.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData({...formData, image: ''});
    setImagePreview('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        await portfolioAPI.deleteCertification(id);
        await fetchCertifications();
        alert('Certification deleted successfully!');
      } catch (error) {
        console.error('Error deleting certification:', error);
        alert('Failed to delete certification. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {isEditing ? 'Edit Certification' : 'Add New Certification'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Certification Title *</span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:input-primary transition-all duration-200"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="AWS Certified Solutions Architect"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Issuing Organization *</span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:input-primary transition-all duration-200"
                value={formData.issuer}
                onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                placeholder="Amazon Web Services (AWS)"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Issue Date *</span>
              </label>
              <input
                type="date"
                className="input input-bordered focus:input-primary transition-all duration-200"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered focus:textarea-primary transition-all duration-200 h-24"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of this certification and what it demonstrates..."
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Certificate Image</span>
              </label>
              
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Certificate preview" 
                    className="w-full max-w-md h-48 object-cover rounded-lg shadow-lg mb-2"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="btn btn-error btn-sm absolute top-2 right-2"
                    disabled={isUploading}
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input file-input-bordered file-input-primary w-full max-w-md"
                    disabled={isUploading}
                  />
                  <p className="text-sm text-base-content/60 mt-2">
                    {isUploading ? 'Uploading...' : 'Upload certificate image (max 5MB)'}
                  </p>
                </div>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Credential URL</span>
              </label>
              <input
                type="url"
                className="input input-bordered focus:input-primary transition-all duration-200"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({...formData, credentialUrl: e.target.value})}
                placeholder="https://verify.certification.com/..."
              />
            </div>

            <div className="card-actions justify-end gap-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Update Certification' : 'Add Certification'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Certifications List */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">All Certifications ({certifications.length})</h2>
          
          {certifications.length === 0 ? (
            <div className="text-center py-8 text-base-content/60">
              No certifications added yet. Add your first certification above!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="card bg-base-200 shadow">
                  <div className="card-body">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        {cert.image && (
                          <img 
                            src={cert.image} 
                            alt={cert.title}
                            className="w-16 h-16 object-cover rounded mb-2"
                          />
                        )}
                        <h3 className="font-bold text-lg">{cert.title}</h3>
                        <p className="text-primary">{cert.issuer}</p>
                        <p className="text-sm text-base-content/60">{formatDate(cert.date)}</p>
                        {cert.credentialUrl && (
                          <a 
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link-primary text-sm mt-2 inline-block"
                          >
                            View Credential →
                          </a>
                        )}
                      </div>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-sm">
                          ⋮
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                          <li><a onClick={() => handleEdit(cert)}>Edit</a></li>
                          <li><a onClick={() => handleDelete(cert.id)} className="text-error">Delete</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificationManager;
