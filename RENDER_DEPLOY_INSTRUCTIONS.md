# Render Deployment Instructions

## Issue
Render was looking for package.json in wrong location because it didn't know about the monorepo structure.

## Solution - Option 1: Use Dashboard (Easiest)

1. Go to your Render dashboard
2. Click on your service (portfolio-backend)
3. Go to **Settings**
4. Update these fields:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm run start:prod`
5. Click **Save Changes**
6. **Manual Deploy** > **Deploy latest commit**

## Solution - Option 2: Use render.yaml (Recommended)

The `render.yaml` file at the root now includes `rootDir: backend`.

1. Commit and push the render.yaml:
   ```bash
   git add render.yaml
   git commit -m "Add Render configuration"
   git push
   ```

2. In Render dashboard:
   - Delete current service
   - Create **New** > **Blueprint**
   - Connect to your GitHub repo
   - Render will auto-detect render.yaml

## Environment Variables to Set

Don't forget to set these in Render dashboard:

```
DATABASE_URL=<your_postgres_connection_string>
JWT_SECRET=<your_32_character_secret>
FRONTEND_URL=https://portfolio-one-eta-30.vercel.app
```

## Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## After Deployment

Run migrations:
```bash
# In Render Shell (or add to build command)
npm run prisma:migrate:deploy
```

## Quick Fix Now

If you want to deploy immediately:

1. Go to Render dashboard
2. Settings > Root Directory: `backend`
3. Settings > Build Command: `npm install && npx prisma generate && npm run build`
4. Save
5. Manual Deploy

That's it! 🚀
