import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, expandVariables: true }), PrismaModule, TaskModule],
})
export class AppModule {}
