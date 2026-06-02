import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(dto: RegisterRequest) {
    const { name, email, password } = dto;
    const existsUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existsUser) {
      throw new ConflictException('User already exists with this email');
    }

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  }
}
