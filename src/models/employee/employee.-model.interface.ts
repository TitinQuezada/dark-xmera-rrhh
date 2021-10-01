export interface EmployeeModel {
  employeeCode: string;
  identificationNumber: string;
  name: string;
  lastName: string;
  email: string;
  genderId: string;
  dateOfBirth: string;
  dateOfHired: string;
  positionId: string;
  addressId?: string;
  observations?: string;
}
