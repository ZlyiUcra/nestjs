import { ConfigService } from '@nestjs/config';
import { type JwtModuleOptions } from '@nestjs/jwt';

export async function jwtConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.getOrThrow<string>('JWT_SECRET') || 'default_secret',
  };
}
