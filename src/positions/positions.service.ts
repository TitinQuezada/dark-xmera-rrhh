import { Injectable } from '@nestjs/common';
import { DocumentData } from 'firebase/firestore';
import { Tables } from 'src/enums/tables.enum';
import { PositionModel } from 'src/models/employee/position-model.interface';
import { OperationResult } from 'src/utils/operation-result';
import { PositionCreateOrEditViewModel } from 'src/view-models/position/position-create-or-edit-view-model';
import { PositionViewModel } from 'src/view-models/position/position-view-model';
import { DatabaseService } from '../utils/database.service';

@Injectable()
export class PositionsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getAll(): Promise<OperationResult<Array<PositionViewModel>>> {
    try {
      const positions = await this.databaseService.getAll(Tables.Positions);

      const positionsResult = positions.map((position) =>
        this.buildPosition(position),
      );

      return OperationResult.ok(positionsResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async getById(id: string): Promise<OperationResult<PositionViewModel>> {
    try {
      const position = await this.databaseService.getById(Tables.Positions, id);

      if (!position) {
        return OperationResult.fail('Posición no encontrada');
      }

      const positionResult = this.buildPosition(position);

      return OperationResult.ok(positionResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  buildPosition(document: DocumentData): PositionViewModel {
    return {
      id: document.id,
      name: document.name,
      deparmentId: document.deparmentId,
      createdDate: document.createdDate.toDate(),
      updatedDate: document.updatedDate?.toDate(),
    };
  }

  async create(
    position: PositionCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validatePositionResult = await this.validatePosition(position);

      if (validatePositionResult) {
        return OperationResult.fail(validatePositionResult);
      }

      const positionToCreate = this.buildPositionModel(position);
      positionToCreate.createdDate = new Date();

      await this.databaseService.create(Tables.Positions, positionToCreate);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private async validatePosition(position: PositionModel): Promise<string> {
    if (!position.name) {
      return 'El nombre de la posición es requerido';
    }

    if (!position.deparmentId) {
      return 'El departamento de la posición es requerido';
    }

    const deparment = await this.databaseService.getById(
      Tables.Deparments,
      position.deparmentId,
    );

    if (!deparment) {
      return 'El departamento seleccionado no existe';
    }
  }

  private buildPositionModel(
    position: PositionCreateOrEditViewModel,
  ): PositionModel {
    return {
      name: position.name,
      deparmentId: position.deparmentId,
      createdDate: position.createdDate,
      updatedDate: position.updatedDate || null,
    };
  }

  async update(
    id: string,
    position: PositionModel,
  ): Promise<OperationResult<void>> {
    try {
      const validatePositionResult = await this.validatePosition(position);

      if (validatePositionResult) {
        return OperationResult.fail(validatePositionResult);
      }

      const positionInDb = await this.databaseService.getById(
        Tables.Positions,
        id,
      );
      const positionToUpdate = this.buildPositionModel(position);

      positionToUpdate.createdDate = positionInDb.createdDate;
      positionToUpdate.updatedDate = new Date();

      await this.databaseService.update(Tables.Positions, id, positionToUpdate);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async delete(id: string): Promise<OperationResult<void>> {
    try {
      await this.databaseService.delete(Tables.Positions, id);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }
}
