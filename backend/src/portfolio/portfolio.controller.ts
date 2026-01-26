import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  // Profile Data (Public for GET, Protected for POST/PUT)
  @Get('profile')
  async getProfileData() {
    return this.portfolioService.getProfileData();
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async createProfileData(@Body() data: any) {
    return this.portfolioService.createProfileData(data);
  }

  @Put('profile/:id')
  @UseGuards(JwtAuthGuard)
  async updateProfileData(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.portfolioService.updateProfileData(id, data);
  }

  // Blog Posts (Public for GET, Protected for POST/PUT/DELETE)
  @Get('blogs')
  async getAllBlogPosts() {
    return this.portfolioService.getAllBlogPosts();
  }

  @Get('blogs/:id')
  async getBlogPost(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.getBlogPost(id);
  }

  @Post('blogs')
  @UseGuards(JwtAuthGuard)
  async createBlogPost(@Body() data: any) {
    return this.portfolioService.createBlogPost(data);
  }

  @Put('blogs/:id')
  @UseGuards(JwtAuthGuard)
  async updateBlogPost(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.portfolioService.updateBlogPost(id, data);
  }

  @Delete('blogs/:id')
  @UseGuards(JwtAuthGuard)
  async deleteBlogPost(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteBlogPost(id);
  }

  // Projects (Public for GET, Protected for POST/PUT/DELETE)
  @Get('projects')
  async getAllProjects() {
    return this.portfolioService.getAllProjects();
  }

  @Get('projects/:id')
  async getProject(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.getProject(id);
  }

  @Post('projects')
  @UseGuards(JwtAuthGuard)
  async createProject(@Body() data: any) {
    return this.portfolioService.createProject(data);
  }

  @Put('projects/:id')
  @UseGuards(JwtAuthGuard)
  async updateProject(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.portfolioService.updateProject(id, data);
  }

  @Delete('projects/:id')
  @UseGuards(JwtAuthGuard)
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteProject(id);
  }

  // Skills (Public for GET, Protected for POST/PUT/DELETE)
  @Get('skills')
  async getAllSkills() {
    return this.portfolioService.getAllSkills();
  }

  @Post('skills')
  @UseGuards(JwtAuthGuard)
  async createSkill(@Body() data: any) {
    return this.portfolioService.createSkill(data);
  }

  @Put('skills/:id')
  @UseGuards(JwtAuthGuard)
  async updateSkill(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.portfolioService.updateSkill(id, data);
  }

  @Delete('skills/:id')
  @UseGuards(JwtAuthGuard)
  async deleteSkill(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteSkill(id);
  }

  // Skill Categories (Public for GET, Protected for POST/PUT/DELETE)
  @Get('skill-categories')
  async getAllSkillCategories(@Req() req: any) {
    // For public access, use a default userId or get from query params
    const userId = req.user?.userId || 1; // Default to userId 1 for public access
    return this.portfolioService.getAllSkillCategories(userId);
  }

  @Post('skill-categories')
  @UseGuards(JwtAuthGuard)
  async createSkillCategory(@Body() data: any, @Req() req: any) {
    return this.portfolioService.createSkillCategory({
      ...data,
      userId: req.user.userId,
    });
  }

  @Put('skill-categories/:id')
  @UseGuards(JwtAuthGuard)
  async updateSkillCategory(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.portfolioService.updateSkillCategory(id, data);
  }

  @Delete('skill-categories/:id')
  @UseGuards(JwtAuthGuard)
  async deleteSkillCategory(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteSkillCategory(id);
  }

  // Certifications (Public for GET, Protected for POST/PUT/DELETE)
  @Get('certifications')
  async getAllCertifications() {
    return this.portfolioService.getAllCertifications();
  }

  @Get('certifications/:id')
  async getCertification(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.getCertification(id);
  }

  @Post('certifications')
  @UseGuards(JwtAuthGuard)
  async createCertification(@Body() data: any) {
    return this.portfolioService.createCertification(data);
  }

  @Put('certifications/:id')
  @UseGuards(JwtAuthGuard)
  async updateCertification(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.portfolioService.updateCertification(id, data);
  }

  @Delete('certifications/:id')
  @UseGuards(JwtAuthGuard)
  async deleteCertification(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteCertification(id);
  }

  // Education (Public for GET, Protected for POST/PUT/DELETE)
  @Get('education')
  async getAllEducation() {
    return this.portfolioService.getAllEducation();
  }

  @Get('education/:id')
  async getEducation(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.getEducation(id);
  }

  @Post('education')
  @UseGuards(JwtAuthGuard)
  async createEducation(@Body() data: any) {
    return this.portfolioService.createEducation(data);
  }

  @Put('education/:id')
  @UseGuards(JwtAuthGuard)
  async updateEducation(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.portfolioService.updateEducation(id, data);
  }

  @Delete('education/:id')
  @UseGuards(JwtAuthGuard)
  async deleteEducation(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteEducation(id);
  }

  // About Me (Public for GET, Protected for POST/PUT)
  @Get('about')
  async getAboutMe() {
    return this.portfolioService.getAboutMe();
  }

  @Post('about')
  @UseGuards(JwtAuthGuard)
  async createAboutMe(@Body() data: any) {
    return this.portfolioService.createAboutMe(data);
  }

  @Put('about/:id')
  @UseGuards(JwtAuthGuard)
  async updateAboutMe(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.portfolioService.updateAboutMe(id, data);
  }
}
