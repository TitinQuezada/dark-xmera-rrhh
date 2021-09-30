import { Body, Controller, Get, Post } from '@nestjs/common';
import { HttpResponse } from 'src/utils/http-response';
import Database from '../utils/database';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getAll(): Promise<HttpResponse> {
    const operationResult = await this.employeesService.getAll();

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Post()
  async create(@Body() body) {
    await Database.create('employees', body);
    return 'created';
  }
}
