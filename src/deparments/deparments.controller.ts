import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeparmentModel } from 'src/models/deparment/deparment-model.interface';
import { DeparmentsService } from './deparments.service';

@Controller('deparments')
export class DeparmentsController {
  constructor(private readonly deparmentsService: DeparmentsService) {}

  @Get()
  async getAll() {
    return await this.deparmentsService.getAll();
  }

  @Post()
  async create(@Body() deparment: DeparmentModel) {
    await this.deparmentsService.create(deparment);
    return 'created';
  }
}
