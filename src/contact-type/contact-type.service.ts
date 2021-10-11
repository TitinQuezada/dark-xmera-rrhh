import { Injectable } from '@nestjs/common';
import { DocumentData } from 'firebase/firestore';
import { Tables } from 'src/enums/tables.enum';
import { ContactTypeModel } from 'src/models/employee/contact-type-model';
import { DatabaseService } from 'src/utils/database.service';
import { OperationResult } from 'src/utils/operation-result';
import { ContactTypeCreateOrEditViewModel } from 'src/view-models/contact-type/contact-type-create-or-edit-view-model';
import { ContactTypeViewModel } from 'src/view-models/contact-type/contact-type-view-model-';

@Injectable()
export class ContactTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<OperationResult<Array<ContactTypeViewModel>>> {
    try {
      const contactTypes = await this.databaseService.getAll(
        Tables.ContactTypes,
      );
      const contactTypesResult = contactTypes.map((contactType) =>
        this.buildContactType(contactType),
      );

      return OperationResult.ok(contactTypesResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async getById(id: string): Promise<OperationResult<ContactTypeViewModel>> {
    try {
      const contactType = await this.databaseService.getById(
        Tables.ContactTypes,
        id,
      );

      if (!contactType) {
        return OperationResult.fail('Tipo de contacto no encontrado');
      }

      const contactTypeResult = this.buildContactType(contactType);

      return OperationResult.ok(contactTypeResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private buildContactType(document: DocumentData): ContactTypeViewModel {
    return {
      id: document.id,
      name: document.name,
    };
  }

  async create(
    contactType: ContactTypeCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateContactTypeResult = this.validateContactType(contactType);

      if (validateContactTypeResult) {
        return OperationResult.fail(validateContactTypeResult);
      }

      const contactTypeToCreate = this.buildContactTypeModel(contactType);

      await this.databaseService.create(
        Tables.ContactTypes,
        contactTypeToCreate,
      );

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private validateContactType(
    contactType: ContactTypeCreateOrEditViewModel,
  ): string {
    if (!contactType.name) {
      return 'El nombre del tipo de contacto es requerido';
    }
  }

  private buildContactTypeModel(
    contactType: ContactTypeCreateOrEditViewModel,
  ): ContactTypeModel {
    return {
      name: contactType.name,
    };
  }

  async update(
    id: string,
    contactType: ContactTypeCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateGenderResult = this.validateContactType(contactType);

      if (validateGenderResult) {
        return OperationResult.fail(validateGenderResult);
      }

      const genderToUpdate = await this.buildContactTypeModel(contactType);

      await this.databaseService.update(
        Tables.ContactTypes,
        id,
        genderToUpdate,
      );

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async delete(id: string): Promise<OperationResult<void>> {
    try {
      await this.databaseService.delete(Tables.ContactTypes, id);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }
}
