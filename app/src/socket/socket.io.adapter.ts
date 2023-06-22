import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server as HttpServer } from 'http';
import { Server as SecureServer } from 'https';
import { Server } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  constructor(
    app: INestApplicationContext,
    private readonly server: HttpServer | SecureServer,
  ) {
    console.log('hello');
    super(app);
  }

  createIOServer(port: number, options?: any): any {
    console.log('server', port, options);
    return new Server(this.server, options);
  }
}
