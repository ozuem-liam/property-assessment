import axios from "axios";
import { BASE_API_URL } from "../constant";
import {
  IProperty,
  UpdateRateDateResponce,
  UpdateRateDateTypeResponse,
  UpdateRateMultipleDateData,
  UpdateRateSingleDateData,
} from "./types";
import { GlobalResponseHandler, IApiResponse } from "../response.helper";

export class PropertyService {
  static async getPropertyById(
    id: string
  ): Promise<IApiResponse<IProperty | null>> {
    try {
      const userStr = localStorage.getItem("user") || "";
      const accessToken = JSON.parse(userStr)?.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const resp = await axios.get(BASE_API_URL + `/properties/${id}`, {
        headers,
      });
      const message = "Property retrieved successfully";
      return GlobalResponseHandler.handleSuccessResponse<IProperty>(
        resp.data,
        message
      );
    } catch (error: any) {
      const errorMessage =
        error?.message || "Something failed, Try again later";
      return GlobalResponseHandler.handleErrorResponse(errorMessage);
    }
  }

  static async updatePropertySingleRate(
    updateRateSingleDateData: UpdateRateSingleDateData
  ): Promise<IApiResponse<UpdateRateDateTypeResponse>> {
    try {
      const userStr = localStorage.getItem("user") || "";
      const accessToken = JSON.parse(userStr)?.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const resp = await axios.post(
        BASE_API_URL + "/properties/update-rate-single-date",
        updateRateSingleDateData,
        {
          headers,
        }
      );
      const message = resp?.data?.message || "Property single rate updated successfully";
      return GlobalResponseHandler.handleSuccessResponse<UpdateRateDateResponce>(
        resp.data,
        message
      );
    } catch (error: any) {
      const errorMessage =
        error?.message || "Something failed, Try again later";
      return GlobalResponseHandler.handleErrorResponse(errorMessage);
    }
  }

  static async updatePropertyMultipleRate(
    updateRateMultipleDateData: UpdateRateMultipleDateData
  ): Promise<IApiResponse<UpdateRateDateTypeResponse>> {
    try {
      const userStr = localStorage.getItem("user") || "";
      const accessToken = JSON.parse(userStr)?.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const resp = await axios.post(
        BASE_API_URL + "/properties/update-rate-multiple-dates",
        updateRateMultipleDateData,
        {
          headers,
        }
      );
      const message = resp?.data?.message || "Property multiple rate updated successfully";
      return GlobalResponseHandler.handleSuccessResponse<UpdateRateDateResponce>(
        resp.data,
        message
      );
    } catch (error: any) {
      const errorMessage =
        error?.message || "Something failed, Try again later";
      return GlobalResponseHandler.handleErrorResponse(errorMessage);
    }
  }
}
