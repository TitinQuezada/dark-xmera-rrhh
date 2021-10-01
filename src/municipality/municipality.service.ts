import { Injectable } from '@nestjs/common';
import { DocumentData } from 'firebase/firestore';
import { Tables } from 'src/enums/tables.enum';
import { MunicipalityModel } from 'src/models/municipality/municipality-model';
import Database from 'src/utils/database';
import { OperationResult } from 'src/utils/operation-result';
import { MunicipalityCreateOrEditViewModel } from 'src/view-models/municipality/municipality-create-or-edit-view-model';
import { MunicipalityViewModel } from 'src/view-models/municipality/municipality-view-model';

@Injectable()
export class MunicipalityService {
  async getAll(): Promise<OperationResult<Array<MunicipalityViewModel>>> {
    try {
      const municipalities = await Database.getAll(Tables.Municipalities);
      const municipalitiesResult = municipalities.map((municipality) =>
        this.buildMunicipality(municipality),
      );

      return OperationResult.ok(municipalitiesResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async getById(id: string): Promise<OperationResult<MunicipalityViewModel>> {
    try {
      const municipality = await Database.getById(Tables.Municipalities, id);

      if (!municipality) {
        return OperationResult.fail('Municipio no encontrado');
      }

      const contactTypeResult = this.buildMunicipality(municipality);

      return OperationResult.ok(contactTypeResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private buildMunicipality(document: DocumentData): MunicipalityViewModel {
    return {
      id: document.id,
      name: document.name,
    };
  }

  async create(
    municipality: MunicipalityCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateMunicipalityResult =
        this.validateMunicipality(municipality);

      if (validateMunicipalityResult) {
        return OperationResult.fail(validateMunicipalityResult);
      }

      const municipalityToCreate = this.buildMunicipalityModel(municipality);

      await Database.create(Tables.Municipalities, municipalityToCreate);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private validateMunicipality(
    municipality: MunicipalityCreateOrEditViewModel,
  ): string {
    if (!municipality.name) {
      return 'El nombre del tipo de contacto es requerido';
    }
  }

  private buildMunicipalityModel(
    municipality: MunicipalityCreateOrEditViewModel,
  ): MunicipalityModel {
    return {
      name: municipality.name,
    };
  }

  async update(
    id: string,
    municipality: MunicipalityCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateGenderResult = this.validateMunicipality(municipality);

      if (validateGenderResult) {
        return OperationResult.fail(validateGenderResult);
      }

      const municipalityToUpdate = await this.buildMunicipalityModel(
        municipality,
      );

      await Database.update(Tables.Municipalities, id, municipalityToUpdate);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async delete(id: string): Promise<OperationResult<void>> {
    try {
      await Database.delete(Tables.Municipalities, id);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }
}
