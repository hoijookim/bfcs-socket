// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  let app;

  if (process.env.NODE_ENV === 'production') {
    const httpsOptions = {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    };
    app = await NestFactory.create(AppModule, new ExpressAdapter(), {
      httpsOptions,
    });
  } else {
    app = await NestFactory.create(AppModule, new ExpressAdapter());
  }

  await app.listen(3000, () => console.log('Server is listening on port 3000'));
}

bootstrap();
