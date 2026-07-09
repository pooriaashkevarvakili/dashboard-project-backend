import { Module } from '@nestjs/common';
import { SpotAssetsService } from './spot-assets.service';
import { SpotAssetsController } from './spot-assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {SpotAsset} from './entities/spot-asset.entity'
@Module({
      imports: [TypeOrmModule.forFeature([SpotAsset])],
  
  controllers: [SpotAssetsController],
  providers: [SpotAssetsService],
})
export class SpotAssetsModule {}
