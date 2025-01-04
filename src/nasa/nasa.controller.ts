import { Controller, Get, Query } from '@nestjs/common';
import { NasaService } from './nasa.service';

@Controller('nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @Get('mars-photos')
  getMarsRoverPhotos(
    @Query('rover') rover?: string,
    @Query('sol') sol?: number,
  ) {
    return this.nasaService.getMarsRoverPhotos(rover, sol);
  }
}