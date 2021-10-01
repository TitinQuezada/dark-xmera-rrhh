import { ApiProperty } from '@nestjs/swagger';

export class MunicipalityCreateOrEditViewModel {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;
}
