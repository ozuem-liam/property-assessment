import axios from "axios";
import { BASE_API_URL } from "../constant";
import { ILoginResponseData } from "./types";
import { GlobalResponseHandler, IApiResponse } from "../response.helper";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<IApiResponse<ILoginResponseData | null>> {
    try {
      const payload = {
        email,
        password,
      };
      const resp = await axios.post(BASE_API_URL + `/auth/login`, payload);
      const message = "Login successfully";
      return GlobalResponseHandler.handleSuccessResponse<ILoginResponseData>(
        resp.data,
        message
      );
    } catch (error: unknown) {
      return GlobalResponseHandler.handleErrorResponse(error);
    }
  }
}

// export { AuthService }
