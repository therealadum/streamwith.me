import { Module } from '@nestjs/common';
import { PubSubService } from 'src/_pubsub/pubsub.service';
import { StreamResolver } from './stream.resolver';
import { StreamService } from './stream.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    StreamResolver,
    StreamService,
    ConfigService,
    PubSubService,
    { provide: 'PUB_SUB_BACKEND', useValue: RedisPubSub },
  ],
})
export class StreamModule {}
