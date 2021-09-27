import { Injectable } from '@nestjs/common';
import { DocumentData } from 'firebase/firestore';
import { Tables } from 'src/enums/tables.enum';
import { Employee } from 'src/interfaces/employee/employee.interface';
import Database from '../utils/database';

@Injectable()
export class EmployeesService {
  async getAll(): Promise<Array<Employee>> {
    const users = await Database.getAll(Tables.Employees);
    return users.map((user) => this.buildEmployee(user));
  }

  buildEmployee(document: DocumentData): Employee {
    return {
      id: document.id,
      employeeCode: document.employeeCode,
      identificationNumber: document.identificationNumber,
      name: document.name,
      lastName: document.lastName,
      email: document.email,
      gender: document.gender,
      dateOfBirth: document.dateOfBirth,
      dateOfHired: document.dateOfHired,
      position: '',
      recidentialPhone: '',
      cellPhone: '',
      address: '',
      observations: '',
      academicTrainings: null,
      emergencyContacts: null,
    };
  }
}
