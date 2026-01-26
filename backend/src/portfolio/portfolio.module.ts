import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller.js';
import { PortfolioService } from './portfolio.service.js';
import { PrismaService } from '../database/prisma.service.js';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService, PrismaService],
})
export class PortfolioModule {}
