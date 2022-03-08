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

  @Query('streamState')
  async queryStreamState() {
    return this.streamService.getStreamState();
  }

  @Mutation('setStreamState')
  async setStreamState(@Args('streamStateInput') streamStateInput: any) {
    return this.streamService.setStreamState(streamStateInput);
  }

  @Subscription('streamState', {
    resolve: (payload) => {
      return payload.streamState;
    },
  })
  async streamState() {
    return this.pubSubService.asyncIterator('streamState');
  }
}
