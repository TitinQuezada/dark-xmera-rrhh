import { Body, Controller, Get, Post } from '@nestjs/common';
import { PositionModel } from 'src/models/employee/position-model.interface';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionService: PositionsService) {}

  @Get()
  async getAll() {
    return await this.positionService.getAll();
  }

  @Post()
  async create(@Body() position: PositionModel) {
    await this.positionService.create(position);
    return 'created';
  }
}
