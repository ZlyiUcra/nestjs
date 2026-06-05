import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { isDev } from '../utils/is-dev.utils';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { GqlContext } from '../common/interfaces/gql-context.interface';

export async function getGraphQLConfig(configService: ConfigService): Promise<ApolloDriverConfig> {
  return {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: isDev(configService),
    context: ({ req, res }: GqlContext) => ({ req, res }),
  };
}
