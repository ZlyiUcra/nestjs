import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { GqlContext } from '../../common/interfaces/gql-context.interface';

export const Authorized = createParamDecorator((data: keyof User, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);

  const request = ctx.getContext<GqlContext>().req;
  const user = request.user as User;

  return data ? user[data] : user;
});
