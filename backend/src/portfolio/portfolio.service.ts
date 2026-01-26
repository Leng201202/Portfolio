import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}
  // Profile Data
  async getProfileData() {
    return this.prisma.profileData.findFirst({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async updateProfileData(id: number, data: any) {
    return this.prisma.profileData.update({
      where: { id },
      data: {
        ...data,
        updatedBy: 'admin',
      },
    });
  }

  async createProfileData(data: any) {
    return this.prisma.profileData.create({
      data: {
        ...data,
        updatedBy: 'admin',
      },
    });
  }

  // Blog Posts
  async getAllBlogPosts() {
    return this.prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBlogPost(id: number) {
    return this.prisma.blogPost.findUnique({ where: { id } });
  }

  async createBlogPost(data: any) {
    return this.prisma.blogPost.create({ data });
  }

  async updateBlogPost(id: number, data: any) {
    return this.prisma.blogPost.update({ where: { id }, data });
  }

  async deleteBlogPost(id: number) {
    return this.prisma.blogPost.delete({ where: { id } });
  }

  // Projects
  async getAllProjects() {
    return this.prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getProject(id: number) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  async createProject(data: any) {
    return this.prisma.project.create({ data });
  }

  async updateProject(id: number, data: any) {
    return this.prisma.project.update({ where: { id }, data });
  }

  async deleteProject(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }

  // Skills
  async getAllSkills() {
    return this.prisma.skills.findMany({
      include: { category: true },
      orderBy: { order: 'asc' },
    });
  }

  async createSkill(data: any) {
    // If category is a string, find or create the category
    let categoryId = data.categoryId;
    
    if (!categoryId && data.category) {
      // Find or create category by name
      let category = await this.prisma.skillCategory.findFirst({
        where: { name: data.category },
      });
      
      if (!category) {
        // Create new category with default userId (1)
        category = await this.prisma.skillCategory.create({
          data: {
            name: data.category,
            userId: 1, // Default user
          },
        });
      }
      
      categoryId = category.id;
    }
    
    return this.prisma.skills.create({
      data: {
        name: data.name,
        categoryId: categoryId,
        icon: data.icon,
        order: data.order || 0,
      },
      include: { category: true },
    });
  }

  async updateSkill(id: number, data: any) {
    // Handle category string to categoryId conversion
    let categoryId = data.categoryId;
    
    if (!categoryId && data.category) {
      let category = await this.prisma.skillCategory.findFirst({
        where: { name: data.category },
      });
      
      if (!category) {
        category = await this.prisma.skillCategory.create({
          data: {
            name: data.category,
            userId: 1,
          },
        });
      }
      
      categoryId = category.id;
    }
    
    const updateData: any = {
      name: data.name,
      categoryId: categoryId,
    };
    
    if (data.icon !== undefined) updateData.icon = data.icon;
    if (data.order !== undefined) updateData.order = data.order;
    
    return this.prisma.skills.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });
  }

  async deleteSkill(id: number) {
    return this.prisma.skills.delete({ where: { id } });
  }

  // Skill Categories
  async getAllSkillCategories(userId: number) {
    return this.prisma.skillCategory.findMany({
      where: { userId },
      include: { skills: true },
      orderBy: { order: 'asc' },
    });
  }

  async createSkillCategory(data: any) {
    return this.prisma.skillCategory.create({ data });
  }

  async updateSkillCategory(id: number, data: any) {
    return this.prisma.skillCategory.update({ where: { id }, data });
  }

  async deleteSkillCategory(id: number) {
    return this.prisma.skillCategory.delete({ where: { id } });
  }

  // Certifications
  async getAllCertifications() {
    return this.prisma.certification.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getCertification(id: number) {
    return this.prisma.certification.findUnique({ where: { id } });
  }

  async createCertification(data: any) {
    return this.prisma.certification.create({ data });
  }

  async updateCertification(id: number, data: any) {
    return this.prisma.certification.update({ where: { id }, data });
  }

  async deleteCertification(id: number) {
    return this.prisma.certification.delete({ where: { id } });
  }

  // Education
  async getAllEducation() {
    return this.prisma.education.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getEducation(id: number) {
    return this.prisma.education.findUnique({ where: { id } });
  }

  async createEducation(data: any) {
    return this.prisma.education.create({ data });
  }

  async updateEducation(id: number, data: any) {
    return this.prisma.education.update({ where: { id }, data });
  }

  async deleteEducation(id: number) {
    return this.prisma.education.delete({ where: { id } });
  }

  // About Me
  async getAboutMe() {
    return this.prisma.aboutMe.findFirst({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async createAboutMe(data: any) {
    return this.prisma.aboutMe.create({ data });
  }

  async updateAboutMe(id: number, data: any) {
    return this.prisma.aboutMe.update({ where: { id }, data });
  }
}
