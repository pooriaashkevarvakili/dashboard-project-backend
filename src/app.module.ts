import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { JwtModule } from '@nestjs/jwt';
import { TransactionModule } from './transaction/transaction.module';
import { CryptoPricesModule } from './crypto-prices/crypto-prices.module';
import { OrderHistoryTableModule } from './order-history-table/order-history-table.module';
import { WalletTableModule } from './wallet-table/wallet-table.module';
import { NotesModule } from './notes/notes.module';
import { NotesService } from './notes/notes.service';
import jwtConfig from './auth/config/jwt.config';
import { NotesController } from './notes/notes.controller';
import { NoteEntity } from './notes/entities/note.entity';
import { OrderTableModule } from './order-table/order-table.module';
import { PositionColumnsTableModule } from './position-columns-table/position-columns-table.module';
import { MarketTradesTableModule } from './market-trades-table/market-trades-table.module';
import { OrderBookModule } from './order-book/order-book.module';
import { SpotAssetsModule } from './spot-assets/spot-assets.module';
import { FuturesAssetstableModule } from './futures-assetstable/futures-assetstable.module';
import { MarginAssetTableModule } from './margin-asset-table/margin-asset-table.module';
import { ExternalWalletstableModule } from './external-walletstable/external-walletstable.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // JWT
    JwtModule.registerAsync(jwtConfig.asProvider()),

    // DB
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
     url:'postgresql://project_dashboard_gk1z_user:61hfaDfadNapDaIL9EdMP9ii1i9nMf30@dpg-d919j8u7r5hc73cjfu60-a/project_dashboard_gk1z',
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
     
      }),
    }),
TypeOrmModule.forFeature([NoteEntity]),
    // Logger
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';

        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: { singleLine: true },
                },
            level: isProduction ? 'info' : 'debug',
          },
        };
      },
    }),

    AuthModule,

    TransactionModule,

    CryptoPricesModule,

    OrderHistoryTableModule,

    WalletTableModule,

    NotesModule,

    OrderTableModule,

    PositionColumnsTableModule,

    MarketTradesTableModule,

    OrderBookModule,

    SpotAssetsModule,

    FuturesAssetstableModule,

    MarginAssetTableModule,

    ExternalWalletstableModule,
  ],

  controllers: [AppController, NotesController],
  providers: [AppService,NotesService],
})
export class AppModule {}
