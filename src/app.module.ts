import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';

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
        type: 'postgres',
        url:"postgresql://project_dashboard_gk1z_user:61hfaDfadNapDaIL9EdMP9ii1i9nMf30@dpg-d919j8u7r5hc73cjfu60-a/project_dashboard_gk1z",
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
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}