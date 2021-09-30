import { Injectable } from '@nestjs/common';
import e from 'express';
import { DocumentData } from 'firebase/firestore';
import { Tables } from 'src/enums/tables.enum';
import { AcademicTraining } from 'src/interfaces/employee/academic-training.interface';
import { Address } from 'src/interfaces/employee/address.interface';
import { Contact } from 'src/interfaces/employee/contact.interface';
import { EmergencyContact } from 'src/interfaces/employee/emergency-contact.interface';
import { Employee } from 'src/interfaces/employee/employee.interface';
import { AcademicTrainingModel } from 'src/models/employee/academic-training-model.interface';
import { AddressModel } from 'src/models/employee/address-model.interface';
import { ContactModel } from 'src/models/employee/contact-model';
import { EmergencyContactModel } from 'src/models/employee/emergency-contact-model.interface';
import { EmployeeModel } from 'src/models/employee/employee.-model.interface';
import { OperationResult } from 'src/utils/operation-result';
import Database from '../utils/database';

@Injectable()
export class EmployeesService {
  async getAll(): Promise<OperationResult<Array<Employee>>> {
    try {
      const users = await Database.getAll(Tables.Employees);
      const usersResult = users.map((user) => this.buildEmployee(user));

      return OperationResult.ok(usersResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
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
      positionId: document.positionId,
      contacts: [],
      address: {
        street: '',
        municipalityId: '',
        zipCode: 123456,
        aditionalDetail: '',
      },
      observations: document.observations,
      academicTrainings: document.academicTrainings,
      emergencyContacts: document.emergencyContacts,
    };
  }

  async create(employee: Employee): Promise<OperationResult<void>> {
    try {
      const validateEmployeeResult = this.validateEmployee(employee);

      if (validateEmployeeResult) {
        return OperationResult.fail(validateEmployeeResult);
      }

      const employeeToCreate = this.buildEmployeeModel(employee);

      const createdEmployeeId = await Database.create(
        Tables.Employees,
        employeeToCreate,
      );

      for (let index = 0; index < employee.contacts.length; index++) {
        const contactToCreate = this.buildContactModel(
          employee.contacts[index],
          createdEmployeeId,
        );

        await Database.create(Tables.Contacts, contactToCreate);
      }

      const addressToCreate = this.buildAddressModel(employee.address);
      await Database.create(Tables.Address, addressToCreate);

      for (let index = 0; index < employee.academicTrainings.length; index++) {
        const academicTrainingToCreate = this.buildAcademicTrainingModel(
          employee.academicTrainings[index],
          createdEmployeeId,
        );

        await Database.create(
          Tables.AcademicTrainings,
          academicTrainingToCreate,
        );
      }

      for (let index = 0; index < employee.academicTrainings.length; index++) {
        const emergencyContactToCreate = this.buildEmergencyContactModel(
          employee.emergencyContacts[index],
          createdEmployeeId,
        );

        await Database.create(
          Tables.EmergencyContacts,
          emergencyContactToCreate,
        );
      }

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private validateEmployee(employee: EmployeeModel): string {
    if (!employee.name) {
      return 'El nombre del empleado es requerido';
    }

    if (!employee.lastName) {
      return 'El apellido del empleado es requerido';
    }

    if (!employee.identificationNumber) {
      return 'La identificación del empleado es requerida';
    }

    if (!employee.email) {
      return 'El correo eléctronico del empleado es requerido';
    }

    if (!employee.gender) {
      return 'El genero del empleado es requerido';
    }

    if (!employee.dateOfBirth) {
      return 'La fecha de nacimiento del empleado es requerida';
    }

    if (!employee.dateOfHired) {
      return 'La fecha de contratación del empleado es requerida';
    }

    if (!employee.positionId) {
      return 'La posición del empleado es requerida';
    }
  }

  private buildEmployeeModel(employee: Employee): EmployeeModel {
    return {
      employeeCode: employee.employeeCode,
      identificationNumber: employee.identificationNumber,
      name: employee.name,
      lastName: employee.lastName,
      email: employee.email,
      gender: employee.gender,
      dateOfBirth: employee.dateOfBirth,
      dateOfHired: employee.dateOfHired,
      positionId: employee.positionId,
      observations: employee.observations,
    };
  }

  private buildContactModel(
    contact: Contact,
    employeeId: string,
  ): ContactModel {
    return {
      value: contact.value,
      contactTypeId: contact.contactTypeId,
      employeeId,
    };
  }

  private buildAddressModel(address: Address): AddressModel {
    return {
      street: address.street,
      municipalityId: address.municipalityId,
      zipCode: address.zipCode,
      aditionalDetail: address.aditionalDetail,
    };
  }

  private buildAcademicTrainingModel(
    academicTraining: AcademicTraining,
    employeeId: string,
  ): AcademicTrainingModel {
    return {
      title: academicTraining.title,
      institution: academicTraining.institution,
      employeeId,
    };
  }

  private buildEmergencyContactModel(
    emergencyContact: EmergencyContact,
    employeeId: string,
  ): EmergencyContactModel {
    return {
      name: emergencyContact.name,
      lastname: emergencyContact.lastname,
      relationshipId: emergencyContact.relationshipId,
      employeeId,
    };
  }
}
