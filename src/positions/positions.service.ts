import { Injectable } from '@nestjs/common';
import { DocumentData } from 'firebase/firestore';
import { Tables } from 'src/enums/tables.enum';
import { Position } from 'src/interfaces/employee/position.interface';
import { PositionModel } from 'src/models/employee/position-model.interface';
import Database from '../utils/database';

@Injectable()
export class PositionsService {
  async getAll(): Promise<Array<Position>> {
    const positionsResult = [];
    const positions = await Database.getAll(Tables.Positions);

    for (let index = 0; index < positions.length; index++) {
      const positionResult = await this.buildPosition(positions[index]);
      positionsResult.push(positionResult);
    }

    return positionsResult;
  }

  async buildPosition(document: DocumentData): Promise<Position> {
    const deparment = await Database.getById(
      Tables.Deparments,
      document.deparmentId,
    );

    return {
      id: document.id,
      name: document.name,
      deparment: deparment.name,
    };
  }

  async create(position: PositionModel): Promise<void> {
    const validatePositionResult = await this.validatePosition(position);

    if (validatePositionResult) {
      throw new Error(validatePositionResult);
    }

    const positionToCreate = this.buildPositionModel(position);

    await Database.create(Tables.Positions, positionToCreate);
  }

  private async validatePosition(position: PositionModel): Promise<string> {
    if (!position.name) {
      return 'El nombre de la posición es requerido';
    }

    if (!position.deparmentId) {
      return 'El departamento de la posición es requerido';
    }

    const deparment = await Database.getById(
      Tables.Deparments,
      position.deparmentId,
    );

    if (!deparment) {
      return 'El departamento de la posición seleccionado no existe';
    }
  }

  private buildPositionModel(position: PositionModel): PositionModel {
    return {
      name: position.name,
      deparmentId: position.deparmentId,
    };
  }
}
