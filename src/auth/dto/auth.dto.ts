import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'The JWT access token',
    example:
      'eyJhbGciOiJIUzI1Ni... .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZS... .SflKxwRJSMeKKF2QT4fw... ',
  })
  accessToken!: string;
}
