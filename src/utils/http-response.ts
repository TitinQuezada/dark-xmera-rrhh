import { ApiProperty } from '@nestjs/swagger';
import { Error } from '../interfaces/common/error.interface';

export class HttpResponse {
  private constructor(data: any, success: boolean, error: Error) {
    this.data = data;
    this.success = success;
    this.error = error;
  }

  data: any;
  success: boolean;
  error: Error;

  public static getSuccessResponse<T>(data: T): HttpResponse {
    return new HttpResponse(data, true, null);
  }

  public static getFailedResponse<T>(
    errorMessage: string,
    errorCode: number = 500,
  ): HttpResponse {
    const error = { errorMessage, errorCode };
    return new HttpResponse(null, false, error);
  }
}
