import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StreamModule } from './stream/stream.module';
import { ConfigModule } from '@nestjs/config';
import configurationFactory from './_config/config.factory';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    StreamModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      // playground: false,
      typePaths: ['../../_schema/*.graphql'],
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    ConfigModule.forRoot({
      load: [configurationFactory],
    }),
  ],
})
export class AppModule {}
