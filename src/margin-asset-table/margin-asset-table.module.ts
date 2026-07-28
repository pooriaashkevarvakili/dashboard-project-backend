import { Module } from '@nestjs/common';
import { MarginAssetTableService } from './margin-asset-table.service';
import { MarginAssetTableController } from './margin-asset-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {marginAssetTable} from './entities/margin-asset-table.entity'
@Module({
          imports: [TypeOrmModule.forFeature([marginAssetTable])],
  
  controllers: [MarginAssetTableController],
  providers: [MarginAssetTableService],
})
export class MarginAssetTableModule {}
