import { Injectable } from '@nestjs/common';
import { DocumentData } from 'firebase/firestore';
import { Tables } from 'src/enums/tables.enum';
import { DeparmentModel } from 'src/models/deparment/deparment-model.interface';
import Database from 'src/utils/database';
import { OperationResult } from 'src/utils/operation-result';
import { DeparmentCreateOrEditViewModel } from 'src/view-models/deparment/deparment-create-or-edit-view-model';
import { DeparmentViewModel } from 'src/view-models/deparment/deparment-view-model';

@Injectable()
export class DeparmentsService {
  async getAll(): Promise<OperationResult<Array<DeparmentViewModel>>> {
    try {
      const deparments = await Database.getAll(Tables.Deparments);
      const deparmentResult = deparments.map((deparment) =>
        this.buildDeparment(deparment),
      );

      return OperationResult.ok(deparmentResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async getById(id: string): Promise<OperationResult<DeparmentViewModel>> {
    try {
      const deparment = await Database.getById(Tables.Deparments, id);

      if (!deparment) {
        return OperationResult.fail('Departamento no encontrado');
      }

      const deparmentResult = this.buildDeparment(deparment);

      return OperationResult.ok(deparmentResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private buildDeparment(document: DocumentData): DeparmentViewModel {
    return {
      id: document.id,
      name: document.name,
      description: document.description,
      createdDate: document.createdDate.toDate(),
      updatedDate: document.updatedDate?.toDate(),
    };
  }

  async create(
    deparment: DeparmentCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateDeparmentResult = this.validateDeparment(deparment);

      if (validateDeparmentResult) {
        return OperationResult.fail(validateDeparmentResult);
      }

      const deparmentToCreate = await this.buildDeparmentModel(deparment);
      deparmentToCreate.createdDate = new Date();

      await Database.create(Tables.Deparments, deparmentToCreate);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private validateDeparment(deparment: DeparmentCreateOrEditViewModel): string {
    if (!deparment.name) {
      return 'El nombre del departamento es requerido';
    }
  }

  private async buildDeparmentModel(
    deparment: DeparmentCreateOrEditViewModel,
  ): Promise<DeparmentModel> {
    return {
      name: deparment.name,
      description: deparment.description || null,
      createdDate: deparment.createdDate,
      updatedDate: deparment.updatedDate || null,
    };
  }

  async update(
    id: string,
    deparment: DeparmentCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateDeparmentResult = this.validateDeparment(deparment);

      if (validateDeparmentResult) {
        return OperationResult.fail(validateDeparmentResult);
      }

      const deparmentInDb = await Database.getById(Tables.Deparments, id);

      const deparmentToUpdate = await this.buildDeparmentModel(deparment);

      deparmentToUpdate.createdDate = deparmentInDb.createdDate;
      deparmentToUpdate.updatedDate = new Date();

      await Database.update(Tables.Deparments, id, deparmentToUpdate);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async delete(id: string): Promise<OperationResult<void>> {
    try {
      const positions = await Database.get(Tables.Positions, 'deparmentId', id);

      if (positions.length) {
        return OperationResult.fail(
          'No se puede eliminar el departamento porque tiene posiciones asignadas',
        );
      }

      await Database.delete(Tables.Deparments, id);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }
}
