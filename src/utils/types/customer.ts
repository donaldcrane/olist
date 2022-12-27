import { Customers } from "../../models";
import { CreateUserData } from "./user";

export interface CreateCustomerData
  extends CreateUserData,
    Omit<Customers, "id" | "createdAt" | "updatedAt" | "status" | "userId"> {
  phone: string;
  username: string;
  role: string;
}

export interface updateCustomerData {
  id: number;
  firstName?: string;
  lastName?: string;
  photo?: string;
  dob?: string;
  gender?: enum_Gender;
  customer?: CreateCustomerData;
}

enum enum_Gender {
  FEMALE = "female",
  MALE = "male",
  NB = "nb",
}
