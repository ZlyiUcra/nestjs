import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, username: 'john_doe', email: 'john.dow@me.com' },
    { id: 2, username: 'bob_wilson', email: 'bob.wil@me.com' },
    { id: 3, username: 'admin', email: 'admin@me.com' },
  ];

  findAll() {
    return this.users;
  }
}
