import { AcademicTraining } from './academic-training.interface';
import { Address } from './address.interface';
import { Contact } from './contact.interface';
import { EmergencyContact } from './emergency-contact.interface';

export interface Employee {
  id?: string;
  employeeCode: string;
  identificationNumber: string;
  name: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  dateOfHired: string;
  positionId: string;
  contacts: Array<Contact>;
  address: Address;
  observations?: string;
  academicTrainings: Array<AcademicTraining>;
  emergencyContacts: Array<EmergencyContact>;
}
