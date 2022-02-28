import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubService } from '../_pubsub/pubsub.service';
import { StreamService } from './stream.service';

@Resolver('Stream')
export class StreamResolver {
  constructor(
    private streamService: StreamService,
    private pubSubService: PubSubService,
  ) {}

  @Subscription('streams', {
    resolve: (payload) => {
      console.log('HERE', payload);
      return payload.streams;
    },
  })
  async streams() {
    return this.pubSubService.asyncIterator('streams');
  }

  @Mutation('createStream')
  async createStream(@Args('uuid') uuid: string) {
    return this.streamService.create(uuid);
  }

  @Query('streams')
  async queryStreams() {
    return this.streamService.list();
  }
}
