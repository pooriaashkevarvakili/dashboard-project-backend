import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoNewsController } from './news-crypto.controller';
import { CryptoNewsService } from './news-crypto.service';
import { CryptoNewsEntity } from './entities/news-crypto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoNewsEntity])],
  controllers: [CryptoNewsController],
  providers: [CryptoNewsService],
})
export class CryptoNewsModule implements OnModuleInit {
  private readonly logger = new Logger(CryptoNewsModule.name);

  constructor(private readonly newsService: CryptoNewsService) {}

  async onModuleInit() {
    this.logger.log('شروع عملیات Seed...');
    await this.newsService.seed();
    this.logger.log('عملیات Seed به پایان رسید.');
  }
}