import { Module } from '@nestjs/common';
import { ExternalWalletstableService } from './external-walletstable.service';
import { ExternalWalletstableController } from './external-walletstable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ExternalWalletstable} from './entities/external-walletstable.entity'
@Module({
          imports: [TypeOrmModule.forFeature([ExternalWalletstable])],
  
  controllers: [ExternalWalletstableController],
  providers: [ExternalWalletstableService],
})
export class ExternalWalletstableModule {}
