import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.guard';
import { UserRole, type User } from '@prisma/client';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Query(() => UserModel)
  getMe(@Authorized() user: User) {
    return user;
  }

  @Authorization(UserRole.ADMIN)
  @Query(() => [UserModel], {
    name: 'getAllUsers',
    description: 'Method to retrieve all users',
  })
  async getUsers() {
    return await this.userService.findAll();
  }
}
