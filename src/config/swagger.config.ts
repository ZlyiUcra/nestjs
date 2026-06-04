import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0.0')
    .setContact('John Doe', 'https://example.com', 'john.doe@example.com')
    .setLicense('MIT License', 'https://github.com')
    .addBearerAuth()
    .build();
}
