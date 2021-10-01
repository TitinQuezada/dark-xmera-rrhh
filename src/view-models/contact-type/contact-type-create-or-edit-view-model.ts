import { ApiProperty } from '@nestjs/swagger';

export class ContactTypeCreateOrEditViewModel {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;
}
