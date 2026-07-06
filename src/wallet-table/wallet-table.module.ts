import { Module } from '@nestjs/common';
import { WalletTableService } from './wallet-table.service';
import { WalletTableController } from './wallet-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTable } from './entities/wallet-table.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WalletTable])],
  controllers: [WalletTableController],
  providers: [WalletTableService],
})
export class WalletTableModule {}
