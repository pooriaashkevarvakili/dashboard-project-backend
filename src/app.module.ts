import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '185.126.10.222',
      port: 32438,
      username: 'postgres',
      password: 'ro89nGzMs5LvfBbJnLBo',
      database: 'dashboarggh_db',

      autoLoadEntities: true,
      synchronize: false,
    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}