import { Injectable } from '@nestjs/common';
import { DocumentData } from 'firebase/firestore';
import { Tables } from 'src/enums/tables.enum';
import { ContactTypeModel } from 'src/models/employee/contact-type-model';
import Database from 'src/utils/database';
import { OperationResult } from 'src/utils/operation-result';
import { ContactTypeCreateOrEditViewModel } from 'src/view-models/contact-type/contact-type-create-or-edit-view-model';
import { ContactTypeViewModel } from 'src/view-models/contact-type/contact-type-view-model-';

@Injectable()
export class ContactTypeService {
  async getAll(): Promise<OperationResult<Array<ContactTypeViewModel>>> {
    try {
      const contactTypes = await Database.getAll(Tables.ContactTypes);
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
      const contactType = await Database.getById(Tables.ContactTypes, id);
      console.log(contactType);

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

      await Database.create(Tables.ContactTypes, contactTypeToCreate);

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

      await Database.update(Tables.ContactTypes, id, genderToUpdate);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async delete(id: string): Promise<OperationResult<void>> {
    try {
      await Database.delete(Tables.ContactTypes, id);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }
}
