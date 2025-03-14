import axios from "axios";

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
  static handleErrorResponse(error: unknown): IApiResponse<null> {
    let errorMessage = "Something failed. Try again later.";

    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      // Handle generic JavaScript errors
      errorMessage = error.message;
    }
    
    return {
      isSuccess: false,
      message: errorMessage,
      data: null
    }
  }
}