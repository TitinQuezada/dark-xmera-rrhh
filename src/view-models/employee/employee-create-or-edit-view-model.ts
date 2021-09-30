import { ApiProperty } from '@nestjs/swagger';
import { AcademicTrainingCreateOrEditViewModel } from '../academic-training/academic-training-create-or-edit-view-model';
import { AddressCreateOrEditViewModel } from '../address/address-create-or-edit-view-model';
import { ContactCreateOrEditViewModel } from '../contact/contact-create-or-edit-view-model';
import { EmergencyContactCreateOrEditViewModel } from '../emergency-contact/emergency-contact-create-or-edit-view-model';

export class EmployeeCreateOrEditViewModel {
  @ApiProperty()
  id?: string;

  employeeCode: string;

  @ApiProperty()
  identificationNumber: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty()
  dateOfHired: string;

  @ApiProperty()
  positionId: string;

  @ApiProperty({ type: [ContactCreateOrEditViewModel] })
  contacts: Array<ContactCreateOrEditViewModel>;

  @ApiProperty()
  address: AddressCreateOrEditViewModel;

  @ApiProperty()
  observations?: string;

  @ApiProperty({ type: [AcademicTrainingCreateOrEditViewModel] })
  academicTrainings: Array<AcademicTrainingCreateOrEditViewModel>;

  @ApiProperty({ type: [EmergencyContactCreateOrEditViewModel] })
  emergencyContacts: Array<EmergencyContactCreateOrEditViewModel>;
}
