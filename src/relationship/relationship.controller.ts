import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HttpResponse } from 'src/utils/http-response';
import { RelationshipCreateOrEditViewModel } from 'src/view-models/relationship/relationship-create-or-edit-view-model';
import { RelationshipService } from './relationship.service';

@Controller('relationship')
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  @Get()
  async getAll(): Promise<HttpResponse> {
    const operationResult = await this.relationshipService.getAll();

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const operationResult = await this.relationshipService.getById(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Post()
  async create(
    @Body() deparment: RelationshipCreateOrEditViewModel,
  ): Promise<HttpResponse> {
    const operationResult = await this.relationshipService.create(deparment);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() deparment: RelationshipCreateOrEditViewModel,
  ): Promise<HttpResponse> {
    const operationResult = await this.relationshipService.update(
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
    const operationResult = await this.relationshipService.delete(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }
}
