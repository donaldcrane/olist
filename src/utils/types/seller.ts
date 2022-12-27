import { Sellers } from "../../models";
import { CreateUserData } from "./user";

export interface CreateSellerData
  extends CreateUserData,
    Omit<
      Sellers,
      "id" | "createdAt" | "updatedAt" | "status" | "userId" | "fileId"
    > {
  phone: string;
  username: string;
  role: string;
}

export interface updateSellerData {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  photo: string;
  dob: string;
  businessName: string;
  businessType: string;
  contact: string;
  gender?: enum_Gender;
  seller?: CreateSellerData;
}
export interface locationData {
  id: number;
  longitude: string;
  latitude: string;
  address: string;
}
export interface documentData {
  name: string;
  fileId: number;
}
export interface createDocumentData {
  name: string;
  sellerId: number;
  fileId: number;
}

enum enum_Gender {
  FEMALE = "female",
  MALE = "male",
  NB = "nb",
}
