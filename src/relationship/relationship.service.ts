import { Injectable } from '@nestjs/common';
import { DocumentData } from 'firebase/firestore';
import { Tables } from 'src/enums/tables.enum';
import { RelationshipModel } from 'src/models/employee/relationship-model';
import { DatabaseService } from 'src/utils/database.service';
import { OperationResult } from 'src/utils/operation-result';
import { RelationshipCreateOrEditViewModel } from 'src/view-models/relationship/relationship-create-or-edit-view-model';
import { RelationshipViewModel } from 'src/view-models/relationship/relationship-view-model';

@Injectable()
export class RelationshipService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<OperationResult<Array<RelationshipViewModel>>> {
    try {
      const relationships = await this.databaseService.getAll(
        Tables.Relationships,
      );
      const relationshipsResult = relationships.map((relationship) =>
        this.buildRelationship(relationship),
      );

      return OperationResult.ok(relationshipsResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async getById(id: string): Promise<OperationResult<RelationshipViewModel>> {
    try {
      const relationship = await this.databaseService.getById(
        Tables.Relationships,
        id,
      );

      if (!relationship) {
        return OperationResult.fail('Parentesco no encontrado');
      }

      const contactTypeResult = this.buildRelationship(relationship);

      return OperationResult.ok(contactTypeResult);
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private buildRelationship(document: DocumentData): RelationshipViewModel {
    return {
      id: document.id,
      name: document.name,
    };
  }

  async create(
    contactType: RelationshipCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateRelationshipResult = this.validateRelationship(contactType);

      if (validateRelationshipResult) {
        return OperationResult.fail(validateRelationshipResult);
      }

      const contactTypeToCreate = this.buildRelationshipModel(contactType);

      await this.databaseService.create(
        Tables.Relationships,
        contactTypeToCreate,
      );

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  private validateRelationship(
    relationship: RelationshipCreateOrEditViewModel,
  ): string {
    if (!relationship.name) {
      return 'El nombre del parentescoes requerido';
    }
  }

  private buildRelationshipModel(
    relationship: RelationshipCreateOrEditViewModel,
  ): RelationshipModel {
    return {
      name: relationship.name,
    };
  }

  async update(
    id: string,
    relationship: RelationshipCreateOrEditViewModel,
  ): Promise<OperationResult<void>> {
    try {
      const validateRelationshipResult =
        this.validateRelationship(relationship);

      if (validateRelationshipResult) {
        return OperationResult.fail(validateRelationshipResult);
      }

      const relationshipToUpdate = await this.buildRelationshipModel(
        relationship,
      );

      await this.databaseService.update(
        Tables.Relationships,
        id,
        relationshipToUpdate,
      );

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }

  async delete(id: string): Promise<OperationResult<void>> {
    try {
      await this.databaseService.delete(Tables.Relationships, id);

      return OperationResult.ok();
    } catch (error) {
      return OperationResult.fail(error.message);
    }
  }
}
