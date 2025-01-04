import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NasaService {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.nasa.gov';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('NASA_API_KEY');

    if (!this.apiKey) {
      throw new Error('Missing NASA_API_KEY environment variable');
    }
  }

  async getNeoFeed(startDate: string, endDate: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/neo/rest/v1/feed`, {
          params: {
            start_date: startDate,
            end_date: endDate,
            api_key: this.apiKey,
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Error details:', error.response?.data);
      throw new HttpException(
        'Failed to fetch NEO feed data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
