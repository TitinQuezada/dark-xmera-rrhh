import { Body, Controller, Get, Post } from '@nestjs/common';
import Database from '../utils/database';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getAll() {
    return await this.employeesService.getAll();
  }

  @Post()
  async create(@Body() body) {
    await Database.create('employees', body);
    return 'created';
  }
}
