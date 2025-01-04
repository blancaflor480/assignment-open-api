import { Controller, Get, Query } from '@nestjs/common';
import { NasaService } from './nasa.service';

@Controller('nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @Get('apod')
  getAstronomyPictureOfDay(@Query('date') date?: string) {
    return this.nasaService.getAstronomyPictureOfDay(date);
  }
}