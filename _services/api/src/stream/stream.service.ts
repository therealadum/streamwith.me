import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { RedisService } from 'src/_redis/redis.service';
import { PubSubService } from '../_pubsub/pubsub.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class StreamService {
  constructor(
    private pubSubService: PubSubService,
    private httpService: HttpService,
    private configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async list() {
    const request = await firstValueFrom(
      this.httpService.get(
        `${this.configService.get(
          'LIVE_URL',
        )}/WebRTCApp/rest/v2/broadcasts/list/0/50`,
      ),
    );
    const arr = new Array<any>();
    for (let i = 0; i < request?.data?.length; i++) {
      arr.push({ id: request?.data[i].streamId });
    }
    return arr;
  }

  async create(uuid: string) {
    return {
      id: uuid,
    };
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkStreams() {
    const streams = await this.list();
    if (streams && streams.length) {
      await this.setStreamState({
        mode: 'THEATRE',
        metadata: [{ key: 'main', value: streams[0].id }],
      });
    }
  }

  async getStreamState() {
    const result = await this.redisService.get('streamState');
    if (!result) {
      await this.redisService.set(
        'streamState',
        JSON.stringify({
          mode: 'THEATRE',
          metadata: [{ key: 'main', value: '12345' }],
        }),
      );
      return this.getStreamState();
    } else {
      const parsedResult = JSON.parse(result);
      return {
        mode: parsedResult.mode,
        metadata: parsedResult.metadata,
      };
    }
  }

  async setStreamState(streamStateInput: any) {
    await this.redisService.set(
      'streamState',
      JSON.stringify(streamStateInput),
    );
    await this.pubSubService.publish('streamState', {
      streamState: streamStateInput,
    });
    return this.getStreamState();
  }
}
