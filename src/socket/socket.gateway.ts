import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CarsService } from '../cars/cars.service';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private carsService: CarsService) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket, ...args: any[]) {
    console.log('connection...');
    const cars = await this.carsService.getCars();
    cars.forEach((car) => {
      client.on(`/can/${car}/battery`, (data: any) => {
        console.log('batterydata received : ', car, data.toString('utf-8'));
        // 연결된 모든 소켓
        client.broadcast.emit(`/can/${car}/battery`, data.toString('utf-8'));
      });
      client.on(`/can/${car}/fire`, (data: any) => {
        console.log('firedata received : ', car, data.toString('utf-8'));
        // 연결된 모든 소켓
        client.broadcast.emit(`/can/${car}/fire`, data.toString('utf-8'));
      });
    });
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('socket_evt_data')
  handleMessage(client: Socket, data: any): void {
    console.log(
      'socket.io server received : ',
      typeof data,
      data.toString('utf-8'),
    );
    client.broadcast.emit('socket_evt_data', data.toString('utf-8'));
  }
}
