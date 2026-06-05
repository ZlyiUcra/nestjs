import { BaseModel } from './../../common/models/base.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { type User, UserRole } from '@prisma/client';

registerEnumType(UserRole, {
  name: 'UserRole',
});
@ObjectType({
  description: "User's model",
})
export class UserModel extends BaseModel implements User {
  @Field(() => String, {
    nullable: true,
    defaultValue: '',
    description: "User's  name",
  })
  name!: string;

  @Field(() => String, {
    nullable: false,
    description: "User's  email",
  })
  email!: string;

  @Field(() => String, {
    nullable: false,
    description: "User's  password",
  })
  password!: string;

  @Field(() => UserRole, {
    nullable: false,
    description: "User's  role",
  })
  role!: UserRole;
}
