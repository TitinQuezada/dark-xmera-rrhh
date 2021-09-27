import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { PositionsController } from './positions/positions.controller';
import { PositionsService } from './positions/positions.service';
import { DeparmentsController } from './deparments/deparments.controller';
import { DeparmentsService } from './deparments/deparments.service';

@Module({
  imports: [],
  controllers: [AppController, EmployeesController, PositionsController, DeparmentsController],
  providers: [AppService, EmployeesService, PositionsService, DeparmentsService],
})
export class AppModule {}
