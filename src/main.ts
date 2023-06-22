import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { Server as HttpsServer } from 'https';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SocketIoAdapter } from './socket/socket.io.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  let server = null;

  if (configService.get('NODE_ENV') === 'production') {
    // In production mode, use HTTPS
    const httpsOptions = {
      key: readFileSync(`${configService.get('SSL_KEY_PATH')}`),
      cert: readFileSync(`${configService.get('SSL_CERT_PATH')}`),
    };
    server = new HttpsServer(
      httpsOptions,
      app.getHttpAdapter().getHttpServer(),
    );
  } else {
    // In development mode, use HTTP
    server = createServer(app.getHttpAdapter().getHttpServer());
  }

  // use custom adapter
  app.useWebSocketAdapter(new SocketIoAdapter(app, server));

  const port = configService.get('PORT') || 3000;
  server.listen(port);
}

bootstrap();
