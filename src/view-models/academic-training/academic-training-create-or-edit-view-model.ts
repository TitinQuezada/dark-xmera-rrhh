import { ApiProperty } from '@nestjs/swagger';

export class AcademicTrainingCreateOrEditViewModel {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  institution: string;
}
