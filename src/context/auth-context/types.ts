import { ILoginResponseData } from "@/api/auth/types";

export interface IAuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  loginRespData: ILoginResponseData;
}

export interface IAuthProviderProps {
  children: React.ReactNode;
}