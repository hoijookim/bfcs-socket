import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

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

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  await app.listen(port, () =>
    console.log(`Server is listening on port ${port}`),
  );
}

bootstrap();
