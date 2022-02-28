import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PubSubService } from './pubsub.service';

@Module({
  imports: [ConfigModule],
  providers: [
    PubSubService,
    {
      provide: 'PUB_SUB_BACKEND',
      useValue: RedisPubSub,
    },
  ],
  exports: [PubSubService],
})
export class PubSubModule {}
