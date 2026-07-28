import { Module } from '@nestjs/common';
import { FuturesAssetstableService } from './futures-assetstable.service';
import { FuturesAssetstableController } from './futures-assetstable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FuturesAssetTable} from './entities/futures-assetstable.entity'
@Module({
        imports: [TypeOrmModule.forFeature([FuturesAssetTable])],
  
  controllers: [FuturesAssetstableController],
  providers: [FuturesAssetstableService],
})
export class FuturesAssetstableModule {}
