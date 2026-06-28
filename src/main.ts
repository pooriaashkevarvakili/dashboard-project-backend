import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // یا دامنه فرانت‌اند
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Swagger API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doshboard-api-swagger', app, document, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 8000;

  await app.listen(port, '0.0.0.0');

  console.log(`Server: http://0.0.0.0:${port}`);
  console.log(`Swagger: http://0.0.0.0:${port}/api`);
}

bootstrap();