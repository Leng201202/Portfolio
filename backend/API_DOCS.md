# Backend API Documentation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env.dev`:
```env
PORT=8000
NODE_ENV=development
DATABASE_URL=postgres://leng:20122002@localhost:5432/portfolio_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

3. Run Prisma migrations:
```bash
npx prisma migrate dev
```

4. Seed the database:
```bash
npx ts-node prisma/seed.ts
```

5. Start the development server:
```bash
npm run start:dev
```

## API Endpoints

Base URL: `http://localhost:8000/api`

### Authentication

#### POST /auth/login
Login with credentials
```json
{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```
Response:
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "admin@portfolio.com"
  }
}
```

#### POST /auth/register
Register new user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Portfolio (Protected routes require Bearer token)

#### Profile
- `GET /portfolio/profile` - Get profile data (public)
- `POST /portfolio/profile` - Create profile (protected)
- `PUT /portfolio/profile/:id` - Update profile (protected)

#### Blog Posts
- `GET /portfolio/blogs` - Get all blog posts (public)
- `GET /portfolio/blogs/:id` - Get single blog post (public)
- `POST /portfolio/blogs` - Create blog post (protected)
- `PUT /portfolio/blogs/:id` - Update blog post (protected)
- `DELETE /portfolio/blogs/:id` - Delete blog post (protected)

#### Projects
- `GET /portfolio/projects` - Get all projects (public)
- `GET /portfolio/projects/:id` - Get single project (public)
- `POST /portfolio/projects` - Create project (protected)
- `PUT /portfolio/projects/:id` - Update project (protected)
- `DELETE /portfolio/projects/:id` - Delete project (protected)

#### Skills
- `GET /portfolio/skills` - Get all skills (public)
- `POST /portfolio/skills` - Create skill (protected)
- `PUT /portfolio/skills/:id` - Update skill (protected)
- `DELETE /portfolio/skills/:id` - Delete skill (protected)

#### Skill Categories
- `GET /portfolio/skill-categories` - Get all categories (public)
- `POST /portfolio/skill-categories` - Create category (protected)
- `PUT /portfolio/skill-categories/:id` - Update category (protected)
- `DELETE /portfolio/skill-categories/:id` - Delete category (protected)

#### Certifications
- `GET /portfolio/certifications` - Get all certifications (public)
- `GET /portfolio/certifications/:id` - Get single certification (public)
- `POST /portfolio/certifications` - Create certification (protected)
- `PUT /portfolio/certifications/:id` - Update certification (protected)
- `DELETE /portfolio/certifications/:id` - Delete certification (protected)

#### About Me
- `GET /portfolio/about` - Get about me (public)
- `POST /portfolio/about` - Create about me (protected)
- `PUT /portfolio/about/:id` - Update about me (protected)

## Protected Routes

Add Authorization header with Bearer token:
```
Authorization: Bearer <your_jwt_token>
```

## Default Credentials

- Email: admin@portfolio.com
- Password: admin123
