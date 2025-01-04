import { Controller, Get, Query } from '@nestjs/common';
import { NasaService } from './nasa.service';

@Controller('nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @Get('apod')
  getAstronomyPictureOfDay(@Query('date') date?: string) {
    return this.nasaService.getAstronomyPictureOfDay(date);
  }

  @Get('mars-photos')
  getMarsRoverPhotos(
    @Query('rover') rover?: string,
    @Query('sol') sol?: number,
  ) {
    return this.nasaService.getMarsRoverPhotos(rover, sol);
  }

  @Get('neo-feed')
  getNeoFeed(
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ) {
    return this.nasaService.getNeoFeed(startDate, endDate);
  }
}