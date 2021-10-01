import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { PositionsController } from './positions/positions.controller';
import { PositionsService } from './positions/positions.service';
import { DeparmentsController } from './deparments/deparments.controller';
import { DeparmentsService } from './deparments/deparments.service';
import { GendersController } from './genders/genders.controller';
import { GendersService } from './genders/genders.service';
import { ContactTypeController } from './contact-type/contact-type.controller';
import { ContactTypeService } from './contact-type/contact-type.service';
import { MunicipalityController } from './municipality/municipality.controller';
import { MunicipalityService } from './municipality/municipality.service';

@Module({
  imports: [],
  controllers: [AppController, EmployeesController, PositionsController, DeparmentsController, GendersController, ContactTypeController, MunicipalityController],
  providers: [AppService, EmployeesService, PositionsService, DeparmentsService, GendersService, ContactTypeService, MunicipalityService],
})
export class AppModule {}
