import { ApiProperty } from '@nestjs/swagger';

export class PositionCreateOrEditViewModel {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  deparmentId: string;

  createdDate: Date;
  updatedDate: Date;
}
