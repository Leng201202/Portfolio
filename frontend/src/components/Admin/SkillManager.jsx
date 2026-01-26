import React, { useState, useEffect } from 'react';
import usePortfolioStore from '../../store/usePortfolioStore';

function SkillManager() {
  const { skills, addSkill, updateSkill, deleteSkill, fetchSkills } = usePortfolioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 'Intermediate',
    icon: ''
  });

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Frontend',
      level: 'Intermediate',
      icon: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await updateSkill(editingId, formData);
      } else {
        await addSkill(formData);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Failed to save skill. Please try again.');
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      category: skill.category?.name || skill.category,
      level: skill.level,
      icon: skill.icon || ''
    });
    setEditingId(skill.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id);
      } catch (error) {
        console.error('Error deleting skill:', error);
        alert('Failed to delete skill. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {isEditing ? 'Edit Skill' : 'Add New Skill'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Skill Name *</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary transition-all duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="React, JavaScript, Python..."
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Category *</span>
                </label>
                <select
                  className="select select-bordered focus:select-primary transition-all duration-200"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Database</option>
                  <option>DevOps</option>
                  <option>Tools</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Proficiency Level</span>
                </label>
                <select
                  className="select select-bordered focus:select-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>

              <div className="form-control gap-2">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-sm">Icon/Emoji</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-base-200/50 transition-all duration-200"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  placeholder="⚛️ 🔥 💻"
                />
              </div>
            </div>

            <div className="card-actions justify-end gap-2">
              {isEditing && (
                <button type="button" className="btn" onClick={resetForm}>
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Update Skill' : 'Add Skill'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Skills List */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">All Skills ({skills.length})</h2>
          
          {skills.length === 0 ? (
            <div className="text-center py-8 text-base-content/60">
              No skills added yet. Add your first skill above!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="card bg-base-200 shadow">
                  <div className="card-body p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {skill.icon && <span className="text-2xl">{skill.icon}</span>}
                          <h3 className="font-bold">{skill.name}</h3>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <span className="badge badge-sm badge-primary">{skill.category?.name || skill.category}</span>
                          <span className="badge badge-sm badge-outline">{skill.level}</span>
                        </div>
                      </div>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                          </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                          <li><a onClick={() => handleEdit(skill)}>Edit</a></li>
                          <li><a onClick={() => handleDelete(skill.id)} className="text-error">Delete</a></li>
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

export default SkillManager;
