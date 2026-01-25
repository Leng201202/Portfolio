# Portfolio Frontend

## Cloudinary Setup Instructions

### 1. Create a Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com) and sign up for a free account
2. After signing up, you'll be redirected to your dashboard

### 2. Get Your Credentials
From your Cloudinary dashboard:
- **Cloud Name**: Found at the top of the dashboard
- **Upload Preset**: Create an unsigned upload preset:
  1. Go to Settings → Upload
  2. Scroll to "Upload presets"
  3. Click "Add upload preset"
  4. Set "Signing Mode" to **Unsigned**
  5. Give it a name (e.g., "portfolio_uploads")
  6. Save the preset

### 3. Configure Your App
1. Create a `.env` file in the frontend directory (copy from `.env.example`)
2. Add your Cloudinary credentials:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_here
```

### 4. Restart Your Dev Server
After adding the .env file, restart your development server:
```bash
npm run dev
```

## Features
- ✅ Image uploads to Cloudinary CDN
- ✅ Automatic image optimization
- ✅ Fast global delivery
- ✅ No localStorage bloat
- ✅ Professional image management

## Usage
Upload images in the admin panel (Intro Manager) and they'll automatically be stored on Cloudinary!
