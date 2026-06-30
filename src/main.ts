import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  try {
    Logger.log('========== BOOTSTRAP START ==========', 'Bootstrap');

    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });

    app.useLogger(app.get(PinoLogger));

    app.use(helmet());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    app.enableCors({
      origin: true,
      credentials: true,
    });

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Dashboard API')
      .setDescription('Dashboard Backend API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    console.log('\n========== REGISTERED ROUTES ==========');

    const routes = Object.keys(document.paths);

    if (routes.length === 0) {
      console.log('NO ROUTES FOUND');
    } else {
      routes.forEach((r) => console.log(r));
    }

    console.log('=======================================\n');

    SwaggerModule.setup(
      'doshboard-api-swagger',
      app,
      document,
      {
        jsonDocumentUrl: 'doshboard-api-swagger-json',
      },
    );

    const port = Number(process.env.PORT) || 8000;

    await app.listen(port, '0.0.0.0');

    Logger.log(`Listening on ${port}`, 'Bootstrap');
    Logger.log('========== BOOTSTRAP SUCCESS ==========', 'Bootstrap');
  } catch (err) {
    console.error(err);
  }
}

bootstrap();