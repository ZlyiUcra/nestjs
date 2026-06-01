import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exception.filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MovieModule } from './movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0.0')
    .setContact('John Doe', 'https://example.com', 'john.doe@example.com')
    .setLicense('MIT License', 'https://github.com')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [MovieModule],
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}-${methodKey}`,
  });

  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
    customSiteTitle: 'NestJS API Documentation',
  });

  //app.setGlobalPrefix('api');

  app.use(logger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
