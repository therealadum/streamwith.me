import { Module } from '@nestjs/common';
import { PubSubService } from 'src/_pubsub/pubsub.service';
import { StreamResolver } from './stream.resolver';
import { StreamService } from './stream.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { RedisCacheModule } from '../_redis/redis.module';

@Module({
  imports: [HttpModule, RedisCacheModule],
  providers: [
    StreamResolver,
    StreamService,
    ConfigService,
    PubSubService,
    { provide: 'PUB_SUB_BACKEND', useValue: RedisPubSub },
  ],
})
export class StreamModule {}
