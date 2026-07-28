import { Module } from '@nestjs/common';
import { PositionColumnsTableService } from './position-columns-table.service';
import { PositionColumnsTableController } from './position-columns-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Position} from './entities/position-columns-table.entity'
@Module({
    imports: [TypeOrmModule.forFeature([Position])],
  
  controllers: [PositionColumnsTableController],
  providers: [PositionColumnsTableService],
})
export class PositionColumnsTableModule {}
