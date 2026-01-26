/**
 * Upload image to Cloudinary
 * @param {File} file - The image file to upload
 * @param {string} cloudName - Your Cloudinary cloud name
 * @param {string} uploadPreset - Your Cloudinary upload preset (unsigned)
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export const uploadToCloudinary = async (file, cloudName = 'YOUR_CLOUD_NAME', uploadPreset = 'YOUR_UPLOAD_PRESET') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('cloud_name', cloudName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

/**
 * Get Cloudinary configuration from environment variables or defaults
 */
export const getCloudinaryConfig = () => {
  return {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'YOUR_UPLOAD_PRESET',
  };
};
