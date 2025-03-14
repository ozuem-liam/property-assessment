import axios from "axios";
import { BASE_API_URL } from "../constant";
import { ILoginResponseData } from "./types";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<ILoginResponseData> {
    try {
      const payload = {
        email,
        password
      }
      const resp = await axios.post(BASE_API_URL + `/auth/login`, payload);
      return resp.data;
    } catch (error: any) {
      return error;
    }
  }
}

// export { AuthService }
