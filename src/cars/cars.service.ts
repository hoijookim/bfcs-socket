import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CarsService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async getCars(): Promise<string[]> {
    const apiUrl = this.configService.get<string>('BACK_API_URL');
    const response$ = this.httpService.get(`${apiUrl}/truck/list`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await lastValueFrom(response$);
    const cars = [];
    response.data &&
      response.data.map((item) => {
        cars.push(item.serial);
      });
    console.log('response', cars);
    return cars;
  }
}
