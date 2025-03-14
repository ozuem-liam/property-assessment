"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context/AuthProvider";
import SpinnerLoader from "@/components/modals/SpinnerLoader";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "user@example.com",
    password: "string",
  });
  const { login, loginRespData } = useAuth();
  const handleLogin = async () => {
    setLoading(true);
    await login(loginDetails.email, loginDetails.password);
    setLoading(false);
  };
  useEffect(() => {}, [loginRespData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            disabled={true}
            type="email"
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, email: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            disabled={true}
            type="password"
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          disabled={loading}
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? <SpinnerLoader /> : "Login"}
        </button>
      </div>
    </div>
  );
}
