import { Module } from '@nestjs/common';
import { FilterTransactionService } from './filter-transaction.service';
import { FilterTransactionController } from './filter-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TransactionFilterSearch} from './entities/filter-transaction.entity'
@Module({
        imports: [TypeOrmModule.forFeature([TransactionFilterSearch])],
  
  controllers: [FilterTransactionController],
  providers: [FilterTransactionService],
})
export class FilterTransactionModule {}
