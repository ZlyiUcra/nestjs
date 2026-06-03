import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto';
import { hash } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = this.configService.getOrThrow<string>('JWT_SECRET');
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
  }

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
        password: await hash(password),
      },
    });
    return user;
  }
}
