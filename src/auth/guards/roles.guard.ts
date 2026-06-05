import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { User, UserRole } from '@prisma/client';
import { GqlContext } from '../../common/interfaces/gql-context.interface';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesConetxt = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!rolesConetxt) return true;
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<GqlContext>().req;
    const user = request.user as User;
    if (!rolesConetxt.includes(user.role))
      throw new ForbiddenException('You have no enought permissions!!!');

    return true;
  }
}
