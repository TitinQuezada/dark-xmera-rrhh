import { ApiProperty } from '@nestjs/swagger';

export class RelationshipCreateOrEditViewModel {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;
}
