import { DocumentData } from '@firebase/firestore';
import { Injectable } from '@nestjs/common';
import { Tables } from 'src/enums/tables.enum';
import { GenderModel } from 'src/models/gender/gender-model.interface';
import { DatabaseService } from 'src/utils/database.service';
import { OperationResult } from 'src/utils/operation-result';
import { GenderCreateOrEditViewModel } from 'src/view-models/gender/gender-create-or-edit-view-model';
import { GenderViewModel } from 'src/view-models/gender/gender-view-model';

@Injectable()
export class GendersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<OperationResult<Array<GenderViewModel>>> {
    try {
      const genders = await this.databaseService.getAll(Tables.Genders);
      const gendersResult = genders.map((gender) => this.buildGender(gender));

      return OperationResult.ok(gendersResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async getById(id: string): Promise<OperationResult<GenderViewModel>> {
    try {
      const gender = await this.databaseService.getById(Tables.Genders, id);

      if (!gender) {
        return OperationResult.fail('Genero no encontrado');
      }

      const genderResult = this.buildGender(gender);

      return OperationResult.ok(genderResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private buildGender(document: DocumentData): GenderViewModel {
    return {
      id: document.id,
      name: document.name,
    };
  }

  async create(
    gender: GenderCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateGenderResult = this.validateGender(gender);

      if (validateGenderResult) {
        return OperationResult.fail(validateGenderResult);
      }

      const genderToCreate = this.buildGenderModel(gender);

      await this.databaseService.create(Tables.Genders, genderToCreate);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private validateGender(gender: GenderCreateOrEditViewModel): string {
    if (!gender.name) {
      return 'El nombre del genero es requerido';
    }
  }

  private buildGenderModel(
    deparment: GenderCreateOrEditViewModel,
  ): GenderModel {
    return {
      name: deparment.name,
    };
  }

  async update(
    id: string,
    deparment: GenderCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateGenderResult = this.validateGender(deparment);

      if (validateGenderResult) {
        return OperationResult.fail(validateGenderResult);
      }

      const genderToUpdate = await this.buildGenderModel(deparment);

      await this.databaseService.update(Tables.Genders, id, genderToUpdate);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async delete(id: string): Promise<OperationResult<void>> {
    try {
      await this.databaseService.delete(Tables.Genders, id);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }
}
