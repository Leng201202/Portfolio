# Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Environment Variables
- [ ] Create `.env` files from `.env.example` templates
- [ ] Update `DATABASE_URL` with production database credentials
- [ ] Generate strong `JWT_SECRET` (min 32 characters)
- [ ] Configure `VITE_API_URL` to production backend URL
- [ ] Set up Cloudinary credentials
- [ ] Update `FRONTEND_URL` in backend for CORS

### ✅ Security
- [ ] `.env` files are in `.gitignore` (already configured)
- [ ] No hardcoded secrets in code
- [ ] CORS configured for production domain
- [ ] JWT secret is strong and unique
- [ ] Database credentials are secure

### ✅ Database
- [ ] PostgreSQL database created
- [ ] Run migrations: `npm run prisma:migrate`
- [ ] Generate Prisma Client: `npm run prisma:generate`
- [ ] Optional: Seed database: `npm run prisma:seed`

### ✅ Build & Test
- [ ] Frontend builds successfully: `npm run build`
- [ ] Backend builds successfully: `npm run build`
- [ ] No console errors in production build
- [ ] Test all API endpoints
- [ ] Test authentication flow
- [ ] Test admin panel functionality

### ✅ Configuration Updates Needed
- [ ] Update CORS origins in `backend/src/main.ts`
- [ ] Update API URL in `frontend/.env`
- [ ] Configure production database URL

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Full-Stack)

#### Backend (Vercel)
```bash
cd backend
vercel --prod
```

**Required Environment Variables in Vercel:**
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `FRONTEND_URL`
- `NODE_ENV=production`

#### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

**Required Environment Variables in Vercel:**
- `VITE_API_URL` (your backend URL)
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

---

### Option 2: Railway / Render (Backend) + Netlify/Vercel (Frontend)

#### Backend on Railway:
1. Connect GitHub repository
2. Select `backend` as root directory
3. Add environment variables
4. Railway will auto-detect Node.js and deploy

#### Frontend on Netlify:
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

---

### Option 3: DigitalOcean / AWS / Azure

#### Using Docker:
1. Create Dockerfiles (see below)
2. Build and push images
3. Deploy to container service

---

## 🐳 Docker Configuration (Optional)

### Backend Dockerfile
Create `backend/Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
```

### Frontend Dockerfile
Create `frontend/Dockerfile`:
```dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Frontend nginx.conf
Create `frontend/nginx.conf`:
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Docker Compose
Create `docker-compose.yml` in root:
```yaml
version: '3.8'

services:
  database:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: portfolio_db
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@database:5432/portfolio_db
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - database

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://backend:8000/api
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## 🔧 Critical Configuration Changes Needed

### 1. Update Backend CORS (Required)
**File:** `backend/src/main.ts`

Change from:
```typescript
origin: ['http://localhost:5173', 'http://localhost:3000'],
```

To:
```typescript
origin: process.env.FRONTEND_URL?.split(',') || ['http://localhost:5173'],
```

### 2. Update Frontend .gitignore
**File:** `frontend/.gitignore`

Add:
```
.env
.env.local
.env.production
```

### 3. Add Production Scripts
**File:** `backend/package.json`

Add:
```json
"scripts": {
  "start:prod": "node dist/main.js",
  "postinstall": "npx prisma generate"
}
```

---

## 📊 Database Deployment

### Managed PostgreSQL Options:
1. **Supabase** (Free tier available)
2. **Railway** (Automatic PostgreSQL)
3. **Render** (Free PostgreSQL)
4. **Neon** (Serverless PostgreSQL)
5. **AWS RDS**
6. **DigitalOcean Managed Databases**

### Migration Steps:
```bash
# 1. Set DATABASE_URL to production database
export DATABASE_URL="postgres://user:pass@host:5432/db"

# 2. Run migrations
cd backend
npm run prisma:migrate

# 3. Generate Prisma Client
npm run prisma:generate

# 4. (Optional) Seed data
npm run prisma:seed
```

---

## 🔍 Post-Deployment Testing

1. **Health Check:**
   - [ ] Backend API is accessible
   - [ ] Frontend loads correctly
   - [ ] Database connection is working

2. **Functionality Test:**
   - [ ] User registration works
   - [ ] User login works
   - [ ] Admin panel is accessible
   - [ ] CRUD operations work (Projects, Skills, Blog)
   - [ ] Image uploads to Cloudinary work
   - [ ] Theme switching works

3. **Performance:**
   - [ ] Check load times
   - [ ] Monitor database queries
   - [ ] Check for console errors

---

## 🚨 Common Issues

### Issue: CORS Error
**Solution:** Update `FRONTEND_URL` in backend `.env` and redeploy

### Issue: Database Connection Failed
**Solution:** Verify `DATABASE_URL` format and credentials

### Issue: 404 on Refresh
**Solution:** Configure server to serve `index.html` for all routes

### Issue: Environment Variables Not Working
**Solution:** 
- Rebuild after adding env vars
- Check variable names (VITE_ prefix for frontend)
- Restart deployment

---

## 📝 Environment Variable Summary

### Backend (.env)
```
PORT=8000
NODE_ENV=production
DATABASE_URL=postgres://...
JWT_SECRET=...
JWT_EXPIRES_IN=1h
FRONTEND_URL=https://your-domain.com
```

### Frontend (.env)
```
VITE_API_URL=https://api.your-domain.com/api
VITE_CLOUDINARY_CLOUD_NAME=...
VITE_CLOUDINARY_UPLOAD_PRESET=...
```

---

## 🎯 Recommended Stack

For quick deployment with minimal configuration:

**Free Tier:**
- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Database: Supabase or Neon

**Production Ready:**
- Frontend: Vercel
- Backend: Railway or DigitalOcean App Platform
- Database: Railway PostgreSQL or AWS RDS
- CDN: Cloudinary (already configured)

---

## 📞 Support Resources

- NestJS Deployment: https://docs.nestjs.com/
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html
- Prisma Production: https://www.prisma.io/docs/guides/deployment
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app

---

## ✅ Final Checklist

Before going live:
- [ ] All environment variables set correctly
- [ ] Database migrations applied
- [ ] CORS configured for production domain
- [ ] SSL/HTTPS enabled
- [ ] Admin credentials changed from defaults
- [ ] Cloudinary limits checked
- [ ] Error monitoring set up (optional: Sentry)
- [ ] Analytics added (optional: Google Analytics)
- [ ] Domain configured and DNS updated
- [ ] Test all features in production
