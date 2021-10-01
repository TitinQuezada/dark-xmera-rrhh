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
import { HttpResponse } from 'src/utils/http-response';
import { MunicipalityCreateOrEditViewModel } from 'src/view-models/municipality/municipality-create-or-edit-view-model';
import { MunicipalityService } from './municipality.service';

@ApiTags('Municipality')
@Controller('municipality')
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}

  @Get()
  async getAll(): Promise<HttpResponse> {
    const operationResult = await this.municipalityService.getAll();

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const operationResult = await this.municipalityService.getById(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Post()
  async create(
    @Body() deparment: MunicipalityCreateOrEditViewModel,
  ): Promise<HttpResponse> {
    const operationResult = await this.municipalityService.create(deparment);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() deparment: MunicipalityCreateOrEditViewModel,
  ): Promise<HttpResponse> {
    const operationResult = await this.municipalityService.update(
      id,
      deparment,
    );

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<HttpResponse> {
    const operationResult = await this.municipalityService.delete(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }
}
