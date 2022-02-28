import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PubSubService } from '../_pubsub/pubsub.service';

@Injectable()
export class StreamService {
  constructor(
    private pubSubService: PubSubService,
    private httpService: HttpService,
  ) {}

  async list() {
    const request = await firstValueFrom(
      this.httpService.get('http://localhost:8000/api/streams'),
    );
    const streamKeys = Object.keys(request.data.live);
    return streamKeys.filter((id) => id !== 'final').map((id) => ({ id }));
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
