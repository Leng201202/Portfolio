import React, { useState, useEffect } from 'react';
import usePortfolioStore from '../../store/usePortfolioStore';
import { uploadToCloudinary, getCloudinaryConfig } from '../../utils/cloudinaryUpload';

function IntroManager() {
  const { introSection, updateIntroSection } = usePortfolioStore();
  const [formData, setFormData] = useState(introSection);
  const [imagePreview, setImagePreview] = useState(introSection.profileImage || '');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setFormData(introSection);
    setImagePreview(introSection.profileImage || '');
  }, [introSection]);

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
        
        setFormData({...formData, profileImage: imageUrl});
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
    setFormData({...formData, profileImage: ''});
    setImagePreview('');
    // Reset file input
    const fileInput = document.getElementById('profileImageUpload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateIntroSection(formData);
    alert('Intro section updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Hero/Intro Section</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Greeting</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary transition-all duration-200"
                  value={formData.greeting}
                  onChange={(e) => setFormData({...formData, greeting: e.target.value})}
                  placeholder="Hi, I'm"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary transition-all duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="form-control gap-2">
              <label className="label mb-2">
                <span className="label-text font-semibold text-sm">Tagline/Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                placeholder="Full Stack Developer & Creative Problem Solver"
              />
            </div>

            <div className="form-control gap-2">
              <label className="label mb-2">
                <span className="label-text font-semibold text-sm">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered focus:textarea-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200 leading-relaxed"
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="A brief introduction about what you do and your passion..."
              />
            </div>

            <div className="divider">Media & Links</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Profile Image</span>
                </label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-3">
                    <div className="relative inline-block">
                      <div className="avatar">
                        <div className="w-32 rounded-lg ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={imagePreview} alt="Preview" />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="btn btn-circle btn-xs btn-error absolute -top-2 -right-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* File Upload */}
                <input
                  id="profileImageUpload"
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200 w-full"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                {isUploading && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="text-sm text-base-content/60">Uploading to Cloudinary...</span>
                  </div>
                )}
                <label className="label">
                  <span className="label-text-alt text-base-content/50">Max size: 5MB • Formats: JPG, PNG, GIF, WebP • Uploaded to Cloudinary</span>
                </label>

                {/* Alternative URL Input */}
                <div className="divider text-xs">OR</div>
                <input
                  type="url"
                  className="input input-bordered input-sm focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.profileImage && !formData.profileImage.startsWith('http') ? '' : formData.profileImage}
                  onChange={(e) => {
                    setFormData({...formData, profileImage: e.target.value});
                    setImagePreview(e.target.value);
                  }}
                  placeholder="Or paste image URL"
                  disabled={isUploading}
                />
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Resume/CV URL</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({...formData, resumeUrl: e.target.value})}
                  placeholder="https://example.com/resume.pdf"
                />
              </div>
            </div>

            <div className="divider">Availability Status</div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary" 
                  checked={formData.availableForWork || false}
                  onChange={(e) => setFormData({...formData, availableForWork: e.target.checked})}
                />
                <div className="flex flex-col">
                  <span className="label-text font-semibold">Available for Work</span>
                  <span className="label-text-alt text-base-content/60">Show "Available for Work" badge on your profile</span>
                </div>
              </label>
            </div>

            <div className="divider">Call-to-Action Button</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">CTA Button Text</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({...formData, ctaText: e.target.value})}
                  placeholder="Get in Touch"
                />
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">CTA Button Link</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({...formData, ctaLink: e.target.value})}
                  placeholder="mailto:you@example.com or #contact"
                />
              </div>
            </div>

            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Preview */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title text-xl mb-4">Preview</h3>
          <div className="bg-base-200 p-8 rounded-lg text-center">
            {formData.profileImage && (
              <div className="relative inline-block mb-4">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={formData.profileImage} alt="Profile" />
                  </div>
                </div>
                {formData.availableForWork && (
                  <div className="absolute -bottom-2 -right-2 badge badge-sm badge-primary shadow-lg">
                    Available
                  </div>
                )}
              </div>
            )}
            <p className="text-lg opacity-70">{formData.greeting || 'Hi, I\'m'}</p>
            <h1 className="text-4xl font-bold my-2">{formData.name || 'Your Name'}</h1>
            <p className="text-xl text-primary mb-4">{formData.tagline || 'Your Tagline'}</p>
            <p className="max-w-2xl mx-auto mb-6">{formData.description || 'Your description will appear here...'}</p>
            {formData.ctaText && (
              <button className="btn btn-primary">{formData.ctaText}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroManager;
