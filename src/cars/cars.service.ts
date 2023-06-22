import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import * as fs from 'fs';

@Injectable()
export class CarsService {
  private httpClient: AxiosInstance;

  constructor(private configService: ConfigService) {
    let axiosOptions = {};
    if (configService.get('NODE_ENV') === 'production') {
      const certPath = configService.get('SSL_CERT_PATH');
      const keyPath = configService.get('SSL_KEY_PATH');
      axiosOptions = {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
          cert: fs.readFileSync(certPath),
          key: fs.readFileSync(keyPath),
        }),
      };
    }
    this.httpClient = axios.create(axiosOptions);
  }

  async getCars(): Promise<string[]> {
    const response = await this.httpClient.get(
      `${this.configService.get('BACK_API_URL')}/truck/list`,
    );
    const cars = response.data?.map((item) => item.serial) || [];
    console.log('response', cars);
    return cars;
  }
}
