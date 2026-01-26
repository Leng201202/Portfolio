import React, { useState, useEffect } from 'react';
import usePortfolioStore from '../../store/usePortfolioStore';

function AboutMeManager() {
  const { aboutMe, updateAboutMe, fetchAboutMe } = usePortfolioStore();
  const [formData, setFormData] = useState(aboutMe);

  useEffect(() => {
    fetchAboutMe();
  }, [fetchAboutMe]);

  useEffect(() => {
    setFormData(aboutMe);
  }, [aboutMe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAboutMe(formData);
      alert('About Me section updated successfully!');
    } catch (error) {
      console.error('Error updating about me:', error);
      alert('Failed to update About Me section. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">About Me Section</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control gap-2">
              <label className="label mb-2">
                <span className="label-text font-semibold">Title/Headline</span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:input-primary transition-all duration-200"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Full Stack Developer | Tech Enthusiast"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Short Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered focus:textarea-primary transition-all duration-200 leading-relaxed"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="A brief introduction about yourself..."
              />
            </div>

            <div className="form-control gap-2">
              <label className="label mb-2">
                <span className="label-text font-semibold text-sm">Full Bio</span>
              </label>
              <textarea
                className="textarea textarea-bordered focus:textarea-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200 leading-relaxed"
                rows="6"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Your detailed biography, career journey, passions, etc."
              />
            </div>

            <div className="divider">Contact Information</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Location</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="City, Country"
                />
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Phone</span>
                </label>
                <input
                  type="tel"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div className="divider">Social Links</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">LinkedIn</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">GitHub</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Twitter/X</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.twitter}
                  onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                  placeholder="https://twitter.com/username"
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
    </div>
  );
}

export default AboutMeManager;
