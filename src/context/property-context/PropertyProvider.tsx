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

  const { children } = props;
  const router = useRouter();
  // get property by id
  const getPropertyById = async () => {
    try {
      const { isSuccess, message, data } =
        await PropertyService.getPropertyById(PROPERTY_ID);
      if (isSuccess) {
        setPropertyRespData(data);
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Error occured");
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
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Error occured");
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
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Error occured");
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
    }
    getPropertyById();
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
