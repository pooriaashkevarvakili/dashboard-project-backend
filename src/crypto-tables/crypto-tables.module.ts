import { Module } from '@nestjs/common';
import { CryptoTablesService } from './crypto-tables.service';
import { CryptoTablesController } from './crypto-tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Crypto} from './entities/crypto-table.entity'
@Module({
        imports: [TypeOrmModule.forFeature([Crypto])],
  
  controllers: [CryptoTablesController],
  providers: [CryptoTablesService],
})
export class CryptoTablesModule {}
