# Backend Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Step 1: Install PostgreSQL

### macOS (using Homebrew):
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Create Database:
```bash
# Login to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE portfolio_db;
CREATE USER leng WITH PASSWORD '20122002';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO leng;
\q
```

## Step 2: Install Dependencies

```bash
cd backend
npm install
```

## Step 3: Configure Environment

Make sure `.env.dev` has the correct database credentials:
```env
PORT=8000
NODE_ENV=development
DATABASE_URL=postgres://leng:20122002@localhost:5432/portfolio_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=1h
```

## Step 4: Run Database Migrations

```bash
npm run prisma:migrate
```

## Step 5: Seed the Database

```bash
npm run prisma:seed
```

This will create:
- Admin user with email: `admin@portfolio.com` and password: `admin123`
- Default profile data

## Step 6: Start the Server

```bash
npm run start:dev
```

The server will run on http://localhost:8000

## Step 7: Test the API

Try logging in:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

You should get a JWT token in the response.

## Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is running: `brew services list`
- Check database credentials in `.env.dev`
- Test connection: `psql -h localhost -U leng -d portfolio_db`

### Port Already in Use
- Change PORT in `.env.dev`
- Or kill the process using port 8000: `lsof -ti:8000 | xargs kill`

### Prisma Client Not Generated
```bash
npm run prisma:generate
```

## Available Scripts

- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:prod` - Start in production mode
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:seed` - Seed the database
- `npm run build` - Build the application
- `npm run lint` - Lint the code
- `npm run test` - Run tests

## Database Schema

The backend uses the following models:
- **User** - Authentication
- **ProfileData** - Homepage hero section
- **BlogPost** - Blog posts
- **Project** - Portfolio projects
- **Skills** - Technical skills
- **SkillCategory** - Skill groupings
- **Certification** - Certifications
- **AboutMe** - About section content

## Next Steps

1. Start the backend server
2. Update frontend API configuration to point to http://localhost:8000/api
3. Test the integration between frontend and backend
