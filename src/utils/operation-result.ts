export class OperationResult<T> {
  private constructor(entity: T, errorMessage: string, success: boolean) {
    this.entity = entity;
    this.errorMessage = errorMessage;
    this.success = success;
  }

  entity: T;
  errorMessage: string;
  success: boolean;

  public static ok<T>(entity: T = null): OperationResult<T> {
    return new OperationResult<T>(entity, '', true);
  }

  public static fail<T>(errorMessage: string): OperationResult<T> {
    return new OperationResult<T>(null, errorMessage, false);
  }
}
