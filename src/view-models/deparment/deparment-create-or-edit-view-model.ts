import { ApiProperty } from '@nestjs/swagger';

export class DeparmentCreateOrEditViewModel {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  createdDate: Date;
  updatedDate: Date;
}
