import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // =========================
  // SECURITY (Helmet)
  // =========================
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  // =========================
  // GLOBAL VALIDATION
  // =========================
  app.useGlobalPipes(
    new ValidationPipe({
     whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // =========================
  // LOGGER
  // =========================
  app.useLogger(app.get(Logger));

  // =========================
  // GLOBAL PREFIX
  // =========================
  app.setGlobalPrefix('api/v1');

  // =========================
  // CORS (IMPORTANT FIXED)
  // =========================
 app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://dashboard-project-front-mg8b0c5dz-pooriavakilis-projects.vercel.app',
  ],
  credentials: true,
});

  // =========================
  // STATIC FILES (FIXED)
  // =========================
  app.useStaticAssets(join(process.cwd(), 'public'));

  // =========================
  // SWAGGER
  // =========================
  const config = new DocumentBuilder()
    .setTitle('Project Dashboard Backend')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('dashboard-api-swagger', app, document, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // =========================
  // SERVER START
  // =========================
  const port = Number(process.env.PORT) || 8000;

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on: http://localhost:${port}`);
}

bootstrap();