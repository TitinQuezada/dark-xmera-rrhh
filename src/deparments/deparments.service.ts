import { Injectable } from '@nestjs/common';
import { DocumentData } from 'firebase/firestore';
import { Tables } from 'src/enums/tables.enum';
import { Deparment } from 'src/interfaces/deparment/deparment.interface';
import { DeparmentModel } from 'src/models/deparment/deparment-model.interface';
import Database from 'src/utils/database';

@Injectable()
export class DeparmentsService {
  async getAll(): Promise<Array<Deparment>> {
    const deparments = await Database.getAll(Tables.Deparments);
    return deparments.map((user) => this.buildDeparment(user));
  }

  private buildDeparment(document: DocumentData): Deparment {
    return {
      id: document.id,
      name: document.name,
      description: document.description,
    };
  }

  async create(deparment: DeparmentModel): Promise<void> {
    const validateDeparmentResult = this.validateDeparment(deparment);

    if (validateDeparmentResult) {
      throw new Error(validateDeparmentResult);
    }

    const deparmentToCreate = this.buildDeparmentModel(deparment);

    await Database.create(Tables.Deparments, deparmentToCreate);
  }

  private validateDeparment(deparment: DeparmentModel): string {
    if (!deparment.name) {
      return 'El nombre del departamento es requerido';
    }
  }

  private buildDeparmentModel(deparment: DeparmentModel): DeparmentModel {
    return {
      name: deparment.name,
      description: deparment.description || null,
    };
  }
}
