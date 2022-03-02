import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PubSubService } from '../_pubsub/pubsub.service';

@Injectable()
export class StreamService {
  constructor(
    private pubSubService: PubSubService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async list() {
    const request = await firstValueFrom(
      this.httpService.get(
        `${this.configService.get(
          'LIVE_URL',
        )}/WebRTCAppEE/rest/v2/broadcasts/list/0/50`,
      ),
    );
    const arr = new Array<any>();
    for (let i = 0; i < request?.data?.length; i++) {
      arr.push({ id: request?.data[i].streamId });
    }
    return arr;
  }

  async create(uuid: string) {
    return new Promise((resolve, reject) =>
      setTimeout(async () => {
        console.log('checking for streams');
        const streams = await this.list();
        await this.pubSubService.publish('streams', { streams });
        resolve({ id: uuid });
      }, 3000),
    );
  }
}
