import { ApiProperty } from '@nestjs/swagger';

export class ContactCreateOrEditViewModel {
  @ApiProperty()
  value: string;

  @ApiProperty()
  contactTypeId: string;
}
