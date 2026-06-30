import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';

async function bootstrap() {
  try {
    console.log('1. Bootstrap started');

    const app = await NestFactory.create(AppModule);
    console.log('2. Nest application created');

    app.use(helmet());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    app.useLogger(app.get(Logger));

    app.enableCors({
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('Swagger API docs')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    // نمایش تمام Routeهای ثبت شده
    console.log('========== ROUTES ==========');
    console.log(Object.keys(document.paths));
    console.log('============================');

    SwaggerModule.setup('doshboard-api-swagger', app, document, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    const port = Number(process.env.PORT) || 8000;

    console.log(`3. Listening on port ${port}`);

    await app.listen(port, '0.0.0.0');

    console.log(`✅ Server started on port ${port}`);
  } catch (error) {
    console.error('❌ Bootstrap Error');
    console.error(error);
  }
}

bootstrap();