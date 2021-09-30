import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PositionModel } from 'src/models/employee/position-model.interface';
import { HttpResponse } from 'src/utils/http-response';
import { PositionCreateOrEditViewModel } from 'src/view-models/position/position-create-or-edit-view-model';
import { PositionsService } from './positions.service';

@ApiTags('Positions')
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionService: PositionsService) {}

  @Get()
  async getAll(): Promise<HttpResponse> {
    const operationResult = await this.positionService.getAll();

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const operationResult = await this.positionService.getById(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Post()
  async create(
    @Body() position: PositionCreateOrEditViewModel,
  ): Promise<HttpResponse> {
    const operationResult = await this.positionService.create(position);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() deparment: PositionCreateOrEditViewModel,
  ): Promise<HttpResponse> {
    const operationResult = await this.positionService.update(id, deparment);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<HttpResponse> {
    const operationResult = await this.positionService.delete(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }
}
