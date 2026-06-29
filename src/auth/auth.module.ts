import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './decorator/auth.decortor';
import { Hashingservice } from './hashingService/hashingservice.service';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([Auth]),JwtModule.registerAsync(jwtConfig.asProvider()),ConfigModule.forFeature(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService,Hashingservice],
})
export class AuthModule {}
