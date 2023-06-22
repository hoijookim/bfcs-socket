import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SocketGateway } from './socket.gateway';
import { CarsService } from './cars/cars.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [SocketGateway, CarsService],
})
export class AppModule {}
