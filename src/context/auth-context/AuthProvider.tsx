"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { IAuthContextProps, IAuthProviderProps } from "./types";
import { AuthService } from "@/api/auth";
import { ILoginResponseData } from "@/api/auth/types";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DEFAULT_LOGIN_RESPONSE = {
  accessToken: "",
  refreshToken: "",
  firstName: "",
  lastName: "",
  country: "",
  userRole: "",
};

const AuthContext = createContext<IAuthContextProps>({
  login: async () => {},
  loginRespData: DEFAULT_LOGIN_RESPONSE,
});

export const AuthProvider = (props: IAuthProviderProps) => {
  const [loginRespData, setLoginRespData] = useState<ILoginResponseData>(
    DEFAULT_LOGIN_RESPONSE
  );
  const { children } = props;
  const router = useRouter();
  const login = async (email: string, password: string) => {
    const { isSuccess, message, data } = await AuthService.login(
      email,
      password
    );
    if (isSuccess && data) {
      setLoginRespData(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success(message);
      router.push("/property/details");
    } else {
      toast.error(message);
    }
  };
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user: any = JSON.parse(userStr);
      if (!loginRespData?.accessToken && user?.accessToken) {
        setLoginRespData(user);
      }
    } else {
      router.push("/login");
    }
  }, [loginRespData]);
  return (
    <AuthContext.Provider
      value={{
        login,
        loginRespData,
      }}
    >
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
