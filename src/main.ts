import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  //app.setGlobalPrefix('api');
  app.enableCors({
    origin: configService.getOrThrow<string>('ALLOWED_ORIGINs').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    exposedHeaders: ['Set-Cookie', 'Content-Disposition'],
    allowedHeadsers: ['Authorization', 'X-Api-Key'], //'*'
  });

  await app.listen(configService.getOrThrow<number>('PORT'));
}
bootstrap();
