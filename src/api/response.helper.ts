export interface IApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T | null;
}

export class GlobalResponseHandler {
  static handleSuccessResponse<T>(data: T, message: string): IApiResponse<T>  {
    return {
      isSuccess: true,
      message,
      data
    }
  }
  static handleErrorResponse(message: string): IApiResponse<null> {
    return {
      isSuccess: false,
      message,
      data: null
    }
  }
}