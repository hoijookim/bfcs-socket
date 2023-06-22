import { Module } from '@nestjs/common';
import { SocketGateway } from './socket/socket.gateway';
import { ConfigModule } from '@nestjs/config';
import { CarsService } from './cars/cars.service';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';
import { AppController } from './app.controller';
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [SocketGateway, CarsService, AppService],
})
export class AppModule {}
