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
import { ContactTypeCreateOrEditViewModel } from 'src/view-models/contact-type/contact-type-create-or-edit-view-model';
import { ContactTypeService } from './contact-type.service';

@ApiTags('contact-types')
@Controller('contact-type')
export class ContactTypeController {
  constructor(private readonly contactTypesService: ContactTypeService) {}

  @Get()
  async getAll(): Promise<HttpResponse> {
    const operationResult = await this.contactTypesService.getAll();

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const operationResult = await this.contactTypesService.getById(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Post()
  async create(
    @Body() deparment: ContactTypeCreateOrEditViewModel,
  ): Promise<HttpResponse> {
    const operationResult = await this.contactTypesService.create(deparment);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() deparment: ContactTypeCreateOrEditViewModel,
  ): Promise<HttpResponse> {
    const operationResult = await this.contactTypesService.update(
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
    const operationResult = await this.contactTypesService.delete(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }
}
