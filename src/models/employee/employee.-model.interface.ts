export interface EmployeeModel {
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
  addressId?: string;
  observations?: string;
}
