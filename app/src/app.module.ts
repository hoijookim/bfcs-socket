import { Module } from '@nestjs/common';
import { SocketGateway } from './socket/socket.gateway';
import { ConfigModule } from '@nestjs/config';
import { CarsService } from './cars/cars.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [SocketGateway, CarsService],
})
export class AppModule {}
