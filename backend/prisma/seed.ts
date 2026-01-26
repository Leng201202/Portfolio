const { config } = require('dotenv');
const { PrismaClient } = require('../generated/prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Load .env.dev file
config({ path: '.env.dev' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      password: hashedPassword,
    },
  });

  console.log('Admin user created:', admin.email);

  // Create default profile data
  const profile = await prisma.profileData.upsert({
    where: { id: 1 },
    update: {},
    create: {
      greeting: 'Hello, I\'m',
      name: 'Your Name',
      title: 'Full Stack Developer',
      description: 'I build amazing web applications',
      image: 'https://via.placeholder.com/400',
      imageAlt: 'Profile Image',
      availableForWork: true,
      githubUrl: 'https://github.com/yourusername',
      linkedinUrl: 'https://linkedin.com/in/yourusername',
      updatedBy: 'admin',
    },
  });

  console.log('Profile data created:', profile.name);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
