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
import { AcademicTrainingCreateOrEditViewModel } from 'src/view-models/academic-training/academic-training-create-or-edit-view-model';
import { AddressCreateOrEditViewModel } from 'src/view-models/address/address-create-or-edit-view-model';
import { ContactCreateOrEditViewModel } from 'src/view-models/contact/contact-create-or-edit-view-model';
import { EmergencyContactCreateOrEditViewModel } from 'src/view-models/emergency-contact/emergency-contact-create-or-edit-view-model';
import { EmployeeCreateOrEditViewModel } from 'src/view-models/employee/employee-create-or-edit-view-model';
import { EmployeeViewModel } from 'src/view-models/employee/employee-view-model';
import Database from '../utils/database';

@Injectable()
export class EmployeesService {
  async getAll(): Promise<OperationResult<Array<EmployeeViewModel>>> {
    try {
      const employees = await Database.getAll(Tables.Employees);
      const employeesResult = employees.map((employee) =>
        this.buildEmployee(employee),
      );

      return OperationResult.ok(employeesResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  buildEmployee(document: DocumentData): EmployeeViewModel {
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
      //contacts: [],
      // address: {
      //   street: '',
      //   municipalityId: '',
      //   zipCode: 123456,
      //   aditionalDetail: '',
      // },
      observations: document.observations,
      //  academicTrainings: document.academicTrainings,
      // emergencyContacts: document.emergencyContacts,
    };
  }

  async create(
    employee: EmployeeCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateEmployeeResult = await this.validateEmployee(employee);

      if (validateEmployeeResult) {
        return OperationResult.fail(validateEmployeeResult);
      }

      const employeeToCreate = this.buildEmployeeModel(employee);
      employeeToCreate.employeeCode = this.generateCode(employee);

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

  private async validateEmployee(
    employee: EmployeeCreateOrEditViewModel,
  ): Promise<string> {
    if (!employee.name) {
      return 'El nombre del empleado es requerido';
    }

    if (!employee.lastName) {
      return 'El apellido del empleado es requerido';
    }

    if (!employee.identificationNumber) {
      return 'La identificación del empleado es requerida';
    }

    const employeesWithEqualsIdentificationNumber = await Database.get(
      Tables.Employees,
      'identificationNumber',
      employee.identificationNumber,
    );

    if (employeesWithEqualsIdentificationNumber.length) {
      return 'El documento de identidad ya se encuentra registrado';
    }

    if (!employee.email) {
      return 'El correo eléctronico del empleado es requerido';
    }

    const employeesWithEqualsEmail = await Database.get(
      Tables.Employees,
      'email',
      employee.email,
    );

    if (employeesWithEqualsEmail.length) {
      return 'El correo electronico ya se encuentra registrado';
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

    const position = await Database.getById(
      Tables.Positions,
      employee.positionId,
    );

    if (!position) {
      return 'La posición seleccionada no existe';
    }
  }

  private buildEmployeeModel(
    employee: EmployeeCreateOrEditViewModel,
  ): EmployeeModel {
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
    contact: ContactCreateOrEditViewModel,
    employeeId: string,
  ): ContactModel {
    return {
      value: contact.value,
      contactTypeId: contact.contactTypeId,
      employeeId,
    };
  }

  private buildAddressModel(
    address: AddressCreateOrEditViewModel,
  ): AddressModel {
    return {
      street: address.street,
      municipalityId: address.municipalityId,
      zipCode: address.zipCode,
      aditionalDetail: address.aditionalDetail,
    };
  }

  private buildAcademicTrainingModel(
    academicTraining: AcademicTrainingCreateOrEditViewModel,
    employeeId: string,
  ): AcademicTrainingModel {
    return {
      title: academicTraining.title,
      institution: academicTraining.institution,
      employeeId,
    };
  }

  private buildEmergencyContactModel(
    emergencyContact: EmergencyContactCreateOrEditViewModel,
    employeeId: string,
  ): EmergencyContactModel {
    return {
      name: emergencyContact.name,
      lastname: emergencyContact.lastname,
      relationshipId: emergencyContact.relationshipId,
      employeeId,
    };
  }

  generateCode(employee: EmployeeCreateOrEditViewModel): string {
    const codeLength = 5;
    const firstPosition = 0;

    let result =
      employee.name[firstPosition] + employee.lastName[firstPosition];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (var i = 0; i < codeLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * codeLength));
    }

    return result.toUpperCase();
  }
}
