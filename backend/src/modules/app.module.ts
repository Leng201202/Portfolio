import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller.js';
import { AppService } from '../service/app.service.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module.js';
import { PortfolioModule } from '../portfolio/portfolio.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    AuthModule,
    PortfolioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
