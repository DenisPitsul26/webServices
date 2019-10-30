export class ApiResponse<T> {
  success: boolean;
  payload: T;
  errorCode: number;
  errors: any;
}
