import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const NodeMediaServer = require('node-media-server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: '*',
  },
};

var nms = new NodeMediaServer(config);
nms.run();
