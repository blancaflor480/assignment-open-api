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

  async getMarsRoverPhotos(
    roverName: string = 'curiosity',
    sol: number = 1000,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/mars-photos/api/v1/rovers/${roverName}/photos`,
          {
            params: {
              sol,
              api_key: this.apiKey,
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      console.error('Error details:', error.response?.data);
      throw new HttpException(
        'Failed to fetch Mars rover photos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
