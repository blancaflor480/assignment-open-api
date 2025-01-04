import { Controller, Get, Query } from '@nestjs/common';
import { NasaService } from './nasa.service';

@Controller('nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @Get('neo-feed')
  getNeoFeed(
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ) {
    return this.nasaService.getNeoFeed(startDate, endDate);
  }
}