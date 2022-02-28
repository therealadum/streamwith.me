import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import {
  RedisPubSub,
  PubSubRedisOptions,
} from 'graphql-redis-subscriptions/dist/redis-pubsub';

@Injectable()
export class PubSubService {
  private pubsub: RedisPubSub;
  private readonly logger: Logger = new Logger(PubSubService.name);

  constructor(
    @Inject('PUB_SUB_BACKEND') PubSubBackend,
    private configService: ConfigService,
  ) {
    const publisher_host = this.configService.get('REDIS_HOST'),
      publisher_port = this.configService.get('REDIS_PORT'),
      subscriber_host = this.configService.get('REDIS_HOST'),
      subscriber_port = this.configService.get('REDIS_PORT'),
      password = this.configService.get('REDIS_PASSWORD');

    if (!publisher_host) {
      throw new Error(
        'PubSubService requires "redis_host" value from config service',
      );
    }

    if (isNaN(publisher_port)) {
      throw new Error(
        'PubSubService requires "redis_port" value from config service',
      );
    }

    if (!subscriber_host) {
      throw new Error(
        'PubSubService requires "redis_host" value from config service',
      );
    }

    if (isNaN(subscriber_port)) {
      throw new Error(
        'PubSubService requires "redis_port" value from config service',
      );
    }

    if (!password) {
      throw new Error(
        'PubSubService requires "redis_password" value from config service',
      );
    }

    const redisPublisherOptions: Redis.RedisOptions = {
      host: publisher_host,
      port: publisher_port,
      password,
      tls: publisher_host === 'localhost' ? undefined : {},
      retryStrategy: (times) => Math.min(times * 50, 2000),
    };

    const redisSubscriberOptions: Redis.RedisOptions = {
      host: subscriber_host,
      port: subscriber_port,
      password,
      tls: publisher_host === 'localhost' ? undefined : {},
      retryStrategy: (times) => Math.min(times * 50, 2000),
    };

    const publisher = new Redis(redisPublisherOptions),
      subscriber = new Redis(redisSubscriberOptions);

    publisher.on('connect', () =>
      this.logger.log('Redis publisher connection is connected'),
    );
    publisher.on('ready', () =>
      this.logger.log('Redis publisher connection is ready for commands'),
    );
    publisher.on('error', () =>
      this.logger.log(
        'Redis publisher connection encountered error during connection attempt',
      ),
    );
    publisher.on('close', () =>
      this.logger.log('Redis publisher connection has closed'),
    );
    publisher.on('reconnecting', () =>
      this.logger.log('Redis publisher connection is attempting reconnection'),
    );
    publisher.on('end', () =>
      this.logger.log('Redis publisher connection has closed permanently'),
    );

    subscriber.on('connect', () =>
      this.logger.log('Redis subscriber connection is connected'),
    );
    subscriber.on('ready', () =>
      this.logger.log('Redis subscriber connection is ready for commands'),
    );
    subscriber.on('error', () =>
      this.logger.log(
        'Redis subscriber connection encountered error during connection attempt',
      ),
    );
    subscriber.on('close', () =>
      this.logger.log('Redis subscriber connection has closed'),
    );
    subscriber.on('reconnecting', () =>
      this.logger.log('Redis subscriber connection is attempting reconnection'),
    );
    subscriber.on('end', () =>
      this.logger.log('Redis subscriber connection has closed permanently'),
    );

    const pubSubBackendOptions: PubSubRedisOptions = {
      publisher,
      subscriber,
    };

    this.pubsub = new PubSubBackend(pubSubBackendOptions);
  }

  publish(triggerName: string, payload: any) {
    return this.pubsub.publish(triggerName, payload);
  }

  subscribe(
    triggerName: string,
    onMessage: (message: any) => void,
    options: any,
  ) {
    return this.pubsub.subscribe(triggerName, onMessage, options);
  }

  unsubscribe(subId: number) {
    return this.pubsub.unsubscribe(subId);
  }

  asyncIterator(triggers: string | string[]) {
    return this.pubsub.asyncIterator(triggers);
  }
}
