import { ApiProperty } from '@nestjs/swagger';

export class EmergencyContactCreateOrEditViewModel {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  residentialPhone: string;

  @ApiProperty()
  cellPhone: string;

  @ApiProperty()
  relationshipId: string;
}
