import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../api';

function EducationManager() {
  const [education, setEducation] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    period: '',
    description: '',
    achievements: ['']
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const data = await portfolioAPI.getAllEducation();
      setEducation(data);
    } catch (error) {
      console.error('Error fetching education:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      degree: '',
      institution: '',
      period: '',
      description: '',
      achievements: ['']
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const dataToSubmit = {
        ...formData,
        achievements: formData.achievements.filter(a => a.trim() !== '')
      };

      if (isEditing) {
        await portfolioAPI.updateEducation(editingId, dataToSubmit);
      } else {
        await portfolioAPI.createEducation(dataToSubmit);
      }
      
      await fetchEducation();
      resetForm();
      alert('Education entry saved successfully!');
    } catch (error) {
      console.error('Error saving education:', error);
      alert('Failed to save education entry. Please try again.');
    }
  };

  const handleEdit = (edu) => {
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      description: edu.description || '',
      achievements: edu.achievements.length > 0 ? edu.achievements : ['']
    });
    setEditingId(edu.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        await portfolioAPI.deleteEducation(id);
        await fetchEducation();
        alert('Education entry deleted successfully!');
      } catch (error) {
        console.error('Error deleting education:', error);
        alert('Failed to delete education entry. Please try again.');
      }
    }
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  const addAchievement = () => {
    setFormData({ ...formData, achievements: [...formData.achievements, ''] });
  };

  const removeAchievement = (index) => {
    const newAchievements = formData.achievements.filter((_, i) => i !== index);
    setFormData({ ...formData, achievements: newAchievements });
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {isEditing ? 'Edit Education' : 'Add New Education'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Degree/Certificate *</span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:input-primary transition-all duration-200"
                value={formData.degree}
                onChange={(e) => setFormData({...formData, degree: e.target.value})}
                placeholder="Bachelor of Science in Computer Science"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Institution *</span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:input-primary transition-all duration-200"
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                placeholder="University Name / Academy"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Period *</span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:input-primary transition-all duration-200"
                value={formData.period}
                onChange={(e) => setFormData({...formData, period: e.target.value})}
                placeholder="2015 - 2019"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered focus:textarea-primary transition-all duration-200"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of the program, focus areas, etc."
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Achievements/Highlights</span>
              </label>
              <div className="space-y-2">
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 focus:input-primary"
                      value={achievement}
                      onChange={(e) => handleAchievementChange(index, e.target.value)}
                      placeholder="GPA: 3.8/4.0, Dean's List, etc."
                    />
                    {formData.achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAchievement(index)}
                        className="btn btn-error btn-outline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAchievement}
                  className="btn btn-sm btn-outline"
                >
                  + Add Achievement
                </button>
              </div>
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
                {isEditing ? 'Update Education' : 'Add Education'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Education List */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">All Education ({education.length})</h2>
          
          {education.length === 0 ? (
            <div className="text-center py-8 text-base-content/60">
              No education entries added yet. Add your first entry above!
            </div>
          ) : (
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="card bg-base-200 shadow">
                  <div className="card-body">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{edu.degree}</h3>
                        <p className="text-primary font-semibold">{edu.institution}</p>
                        <p className="text-sm text-base-content/60">{edu.period}</p>
                        {edu.description && (
                          <p className="mt-2 text-base-content/80">{edu.description}</p>
                        )}
                        {edu.achievements && edu.achievements.length > 0 && (
                          <div className="mt-3">
                            <p className="font-semibold text-sm mb-1">Achievements:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {edu.achievements.map((achievement, idx) => (
                                <li key={idx} className="text-sm text-base-content/70">
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-sm">
                          ⋮
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                          <li><a onClick={() => handleEdit(edu)}>Edit</a></li>
                          <li><a onClick={() => handleDelete(edu.id)} className="text-error">Delete</a></li>
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

export default EducationManager;
