"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const isFetchedRef = useRef<boolean>(false);
  const { children } = props;
  const router = useRouter();
  // get property by id
  const getPropertyById = async () => {
    const { isSuccess, message, data } = await PropertyService.getPropertyById(
      PROPERTY_ID
    );
    if (isSuccess) {
      setPropertyRespData(data);
      // toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // update property single rate date
  const updatePropertySingleRate = async (
    updateRateSingleDateData: UpdateRateSingleDateData
  ) => {
    const { isSuccess, message } =
      await PropertyService.updatePropertySingleRate(updateRateSingleDateData);
    if (isSuccess) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // update property multiple rate date
  const updatePropertyMultipleRate = async (
    updateRateMultipleDateData: UpdateRateMultipleDateData
  ) => {
    const { isSuccess, message } =
      await PropertyService.updatePropertyMultipleRate(
        updateRateMultipleDateData
      );
    if (isSuccess) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
    }

    // Only fetch if we haven't already
    if (!isFetchedRef.current) {
      isFetchedRef.current = true;
      getPropertyById();
    }
    // getPropertyById();
  }, [router]);

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
