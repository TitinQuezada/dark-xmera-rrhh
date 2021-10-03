import { ApiProperty } from '@nestjs/swagger';

export class RelationshipViewModel {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;
}
