# 🚀 Quick Deployment Guide

Choose your deployment method and follow the steps:

---

## Option 1: Vercel + Render (Easiest - 15 minutes)

### Prerequisites
- GitHub account
- Vercel account (free)
- Render account (free)
- Supabase or Neon account for database (free)

### Steps

#### 1. Set up Database (5 min)
```bash
# Go to https://supabase.com
# Create new project
# Copy the connection string (looks like: postgres://...)
```

#### 2. Deploy Backend to Render (5 min)
```bash
# Go to https://render.com
# New > Web Service
# Connect your GitHub repo
# Settings:
#   - Name: portfolio-backend
#   - Root Directory: backend
#   - Build Command: npm install && npm run build
#   - Start Command: npm run start:prod

# Add Environment Variables:
DATABASE_URL=<your_supabase_connection_string>
JWT_SECRET=<generate_random_32_char_string>
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app

# Click "Create Web Service"
# Wait for deployment (~5 min)
# Copy your backend URL (e.g., https://portfolio-backend.onrender.com)
```

#### 3. Deploy Frontend to Vercel (5 min)
```bash
cd frontend
npm install -g vercel
vercel login

# Deploy
vercel

# Add environment variables when prompted:
VITE_API_URL=https://your-backend.onrender.com/api
VITE_CLOUDINARY_CLOUD_NAME=dwm67qslg
VITE_CLOUDINARY_UPLOAD_PRESET=Portfolio

# Deploy to production
vercel --prod
```

#### 4. Run Database Migrations
```bash
cd backend
export DATABASE_URL="<your_supabase_connection_string>"
npm run prisma:migrate:deploy
```

**Done! Your site is live! 🎉**

---

## Option 2: Docker (Full Control - 10 minutes)

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

#### 1. Create .env file
```bash
cp .env.docker.example .env

# Edit .env and update:
DB_PASSWORD=your_secure_password
JWT_SECRET=your_32_character_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_preset
```

#### 2. Build and Run
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Run migrations
docker-compose exec backend npx prisma migrate deploy

# View logs
docker-compose logs -f
```

#### 3. Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Database: localhost:5432

**Done! Running locally with Docker! 🐳**

---

## Option 3: Railway (All-in-One - 10 minutes)

### Steps

#### 1. Deploy to Railway
```bash
# Go to https://railway.app
# New Project > Deploy from GitHub repo
# Select your repository
# Railway will auto-detect services

# Or use CLI:
npm install -g @railway/cli
railway login
railway init
railway up
```

#### 2. Add Environment Variables
```bash
# Backend service:
NODE_ENV=production
JWT_SECRET=<generate_random_string>
FRONTEND_URL=<will_be_provided_by_railway>

# Frontend service:
VITE_API_URL=<backend_url>/api
VITE_CLOUDINARY_CLOUD_NAME=dwm67qslg
VITE_CLOUDINARY_UPLOAD_PRESET=Portfolio

# Database is automatically created by Railway
```

#### 3. Run Migrations
```bash
railway run npm run prisma:migrate:deploy
```

**Done! Everything deployed on Railway! 🚂**

---

## Environment Variables Quick Reference

### Backend
```env
PORT=8000
NODE_ENV=production
DATABASE_URL=postgres://user:pass@host:5432/db
JWT_SECRET=your_32_character_secret_key
JWT_EXPIRES_IN=1h
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

---

## Generate JWT Secret

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Online
# Visit: https://randomkeygen.com/
```

---

## Troubleshooting

### "CORS Error"
- Make sure `FRONTEND_URL` in backend matches your actual frontend URL
- Redeploy backend after changing environment variables

### "Database Connection Failed"
- Verify `DATABASE_URL` format is correct
- Check if database service is running
- Ensure database allows external connections

### "404 on Page Refresh"
- For Vercel: `vercel.json` is already configured
- For Netlify: `_redirects` file is already created
- For custom nginx: Use the provided `nginx.conf`

### "Build Failed"
- Run `npm install` in both frontend and backend
- Check Node.js version (requires Node 20+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

---

## Post-Deployment Checklist

After deployment, verify:
- [ ] Frontend is accessible
- [ ] Backend API responds (visit `/api`)
- [ ] Can register a new admin account
- [ ] Can login to admin panel
- [ ] Can create/edit projects, skills, blog posts
- [ ] Image uploads work
- [ ] Theme switching works
- [ ] All pages load correctly
- [ ] Mobile view is responsive

---

## Next Steps

1. **Secure Your Admin**
   - Create strong admin password
   - Note down credentials securely

2. **Add Content**
   - Upload your profile photo
   - Add your projects
   - Write blog posts
   - Add skills and certifications

3. **Custom Domain (Optional)**
   - Vercel: Settings > Domains
   - Render: Settings > Custom Domain
   - Railway: Settings > Public Networking

4. **Monitoring (Optional)**
   - Add Sentry for error tracking
   - Set up Google Analytics
   - Configure uptime monitoring

---

## Cost Estimate

### Free Tier (Good for Portfolio)
- Vercel: Free (100GB bandwidth)
- Render: Free (750 hours/month, sleeps after 15min inactive)
- Supabase: Free (500MB database, 2GB bandwidth)
- Cloudinary: Free (25GB storage, 25GB bandwidth)

**Total: $0/month**

### Paid Tier (Production)
- Vercel Pro: $20/month
- Render Standard: $7/month
- Supabase Pro: $25/month
- Cloudinary: Free tier sufficient

**Total: ~$30-50/month**

---

## Support

- 📖 Full Guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- ✅ Checklist: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- 🐛 Issues: Check troubleshooting section above

**Happy Deploying! 🚀**
