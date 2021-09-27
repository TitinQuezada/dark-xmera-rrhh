import { AcademicTraining } from './academic-training.interface';
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
  position: string;
  recidentialPhone?: string;
  cellPhone: string;
  address: string;
  observations?: string;
  academicTrainings: Array<AcademicTraining>;
  emergencyContacts: Array<EmergencyContact>;
}
