import { Module } from '@nestjs/common';
import { OrderTableService } from './order-table.service';
import { OrderTableController } from './order-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTable } from './entities/order-table.entity';
@Module({
  imports: [TypeOrmModule.forFeature([OrderTable])],

  controllers: [OrderTableController],
  providers: [OrderTableService],
})
export class OrderTableModule {}
