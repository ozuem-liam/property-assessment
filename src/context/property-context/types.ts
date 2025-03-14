import {
  IProperty,
  UpdateRateMultipleDateData,
  UpdateRateSingleDateData,
} from "@/api/property/types";

export interface IPropertyContextProps {
  getPropertyById: (id: string) => Promise<void>;
  updatePropertySingleRate: (
    updateRateSingleDateData: UpdateRateSingleDateData
  ) => Promise<void>;
  updatePropertyMultipleRate: (
    updateRateMultipleDateData: UpdateRateMultipleDateData
  ) => Promise<void>;
  propertyRespData: IProperty | null;
}

export interface IPropertyProviderProps {
  children: React.ReactNode;
}
