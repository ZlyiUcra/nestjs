import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SpotifyModule } from './spotify/spotify.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, expandVariables: true }), PrismaModule, SpotifyModule],
})
export class AppModule {}
