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

  async getAstronomyPictureOfDay(date?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/planetary/apod`, {
          params: {
            api_key: this.apiKey,
            date: date, // Optional: YYYY-MM-DD format
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Error details:', error.response?.data);
      throw new HttpException(
        'Failed to fetch NASA APOD data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

 
}
