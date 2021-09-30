import { ApiProperty } from '@nestjs/swagger';

export class GenderCreateOrEditViewModel {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;
}
