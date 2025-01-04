import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { NasaController } from './nasa.controller';
import { NasaService } from './nasa.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [NasaController],
  providers: [NasaService],
})
export class NasaModule {}
