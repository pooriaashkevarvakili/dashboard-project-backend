import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trader } from './entities/trader.entity';
import { TradersService } from './copy-trade.service';
import { TradersController } from './copy-trade.controller';


@Module({

 imports:[
    TypeOrmModule.forFeature([Trader])
 ],

 controllers:[
    TradersController
 ],

 providers:[
    TradersService
 ]

})
export class TradersModule {}