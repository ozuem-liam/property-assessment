"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { IPropertyContextProps, IPropertyProviderProps } from "./types";
import { PropertyService } from "@/api/property";
import {
  IProperty,
  UpdateRateMultipleDateData,
  UpdateRateSingleDateData,
} from "@/api/property/types";
import { ToastContainer, toast } from "react-toastify";
import { PROPERTY_ID } from "@/api/constant";
import { useRouter } from "next/navigation";
import axios from "axios";

const PropertyContext = createContext<IPropertyContextProps>({
  getPropertyById: async () => {},
  updatePropertySingleRate: async () => {},
  updatePropertyMultipleRate: async () => {},
  propertyRespData: null,
});

export const PropertyProvider = (props: IPropertyProviderProps) => {
  const [propertyRespData, setPropertyRespData] = useState<IProperty | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const { children } = props;
  const router = useRouter();

  // get property by id
  const getPropertyById = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { isSuccess, message, data } =
        await PropertyService.getPropertyById(PROPERTY_ID);
      if (isSuccess) {
        setPropertyRespData(data);
        if (!isInitialized) {
          toast.success(message);
        }
      } else {
        toast.error(message);
      }
    } catch (error: unknown) {
      let errorMessage = "Error occurred";

      // Check if the error is an AxiosError
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        // Handle generic JavaScript errors
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  // update property single rate date
  const updatePropertySingleRate = async (
    updateRateSingleDateData: UpdateRateSingleDateData
  ) => {
    try {
      const { isSuccess, message } =
        await PropertyService.updatePropertySingleRate(
          updateRateSingleDateData
        );
      if (isSuccess) {
        toast.success(message);
        await getPropertyById(); // Refresh property data after update
      } else {
        toast.error(message);
      }
    } catch (error) {
      let errorMessage = "Error occurred";

      // Check if the error is an AxiosError
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        // Handle generic JavaScript errors
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };

  // update property multiple rate date
  const updatePropertyMultipleRate = async (
    updateRateMultipleDateData: UpdateRateMultipleDateData
  ) => {
    try {
      const { isSuccess, message } =
        await PropertyService.updatePropertyMultipleRate(
          updateRateMultipleDateData
        );
      if (isSuccess) {
        toast.success(message);
        await getPropertyById(); // Refresh property data after update
      } else {
        toast.error(message);
      }
    } catch (error) {
      let errorMessage = "Error occurred";

      // Check if the error is an AxiosError
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        // Handle generic JavaScript errors
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    // Only fetch property data on initial mount
    if (!isInitialized) {
      getPropertyById();
    }
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        getPropertyById,
        updatePropertySingleRate,
        updatePropertyMultipleRate,
        propertyRespData,
      }}
    >
      {children}
      <ToastContainer />
    </PropertyContext.Provider>
  );
};

export const useProperty = () => useContext(PropertyContext);
