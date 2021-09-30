import { ApiProperty } from '@nestjs/swagger';

export class AddressCreateOrEditViewModel {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  municipalityId: string;

  @ApiProperty()
  zipCode: number;

  @ApiProperty()
  aditionalDetail: string;
}
