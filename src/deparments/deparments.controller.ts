import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeparmentModel } from 'src/models/deparment/deparment-model.interface';
import { HttpResponse } from 'src/utils/http-response';
import { DeparmentCreateOrEditViewModel } from 'src/view-models/deparment/deparment-create-or-edit-view-model';
import { DeparmentsService } from './deparments.service';

@ApiTags('Deparments')
@Controller('deparments')
export class DeparmentsController {
  constructor(private readonly deparmentsService: DeparmentsService) {}

  @Get()
  async getAll(): Promise<HttpResponse> {
    const operationResult = await this.deparmentsService.getAll();

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const operationResult = await this.deparmentsService.getById(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Post()
  async create(
    @Body() deparment: DeparmentCreateOrEditViewModel,
  ): Promise<HttpResponse> {
    const operationResult = await this.deparmentsService.create(deparment);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() deparment: DeparmentCreateOrEditViewModel,
  ): Promise<HttpResponse> {
    const operationResult = await this.deparmentsService.update(id, deparment);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<HttpResponse> {
    const operationResult = await this.deparmentsService.delete(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }
}
