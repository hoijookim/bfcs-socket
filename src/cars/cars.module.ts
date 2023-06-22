import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarsService } from './cars.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [CarsService],
})
export class CarsModule {}
