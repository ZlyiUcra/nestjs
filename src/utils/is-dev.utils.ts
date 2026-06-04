import { ConfigService } from '@nestjs/config';

export const isDev = (consfigService: ConfigService) => {
  const nodeEnv = consfigService.getOrThrow<string>('NODE_ENV');
  return nodeEnv === 'development';
};
