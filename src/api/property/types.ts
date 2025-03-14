interface Price {
  airbnbPrice: number;
  basePrice: number;
  discountPercentage: number;
  boostPercentage: number;
  _id: string;
}

export interface IProperty {
  _id: string;
  propertyName: string;
  address: string;
  city: string;
  country: string;
  baseCurrency: string;
  owner: string;
  employees: string[];
  price: Price;
  pricingState: string;
  bedroomCount: number;
  bathroomCount: number;
  amenities: Record<string, unknown>; // Use `Record` for dynamic key-value pairs
  images: string[];
  email: string;
  phoneNumber: string;
  zipCode: string;
  longtitude: number;
  latitude: number;
  timezone: string;
  type: string;
  logo: string;
  description: string;
  channexId: string;
  channexRatePlans: string[];
  minStay: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  channexRoomId: string;
}

export interface UpdateRateSingleDateData {
  propertyId: string;
  date: Date;
  newRate: number;
}

export interface UpdateRateMultipleDateData {
  propertyId: string;
  startDate: Date;
  endDate: Date;
  newRate: number;
}

export interface UpdateRateDateResponce {
  rateTaskIds: string[];
  message: string;
}

export interface ErrorResponseObject {
  message: string;
  error?: string;
}

export type UpdateRateDateTypeResponse = UpdateRateDateResponce | ErrorResponseObject | null
