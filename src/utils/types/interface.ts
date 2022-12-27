/* eslint-disable @typescript-eslint/no-empty-interface */
import { Customers, Sellers, Users } from "../../models";
declare global {
  namespace Express {
    interface User extends Users {}
    interface Request extends CustomRequest {}
  }
}

export interface CustomRequest {
  user: IUser | null;
  file: object;
  params: object;
  query: object;
  path: object;
  token?: string | null;
  customer?: Customers | null;
  seller?: Sellers | null;
  authOptional?: boolean;
}
export interface IUser {
  id: number;
  email: string;
  password: string;
  username: string;
  phone: string;
  role?: string;
  googleId?: string;
  facebookId?: string;
  twitterId?: string;
  appleId?: string;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISeller {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  photo?: string;
  dob?: string;
  gender?: string;
  businessName: string;
  businessType: string;
  location: string;
  contact: string;
  license: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICustomer {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  photo?: string;
  dob?: string;
  gender?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Person {
  $search: string;
}

export interface IFilter {
  verified?: string;
  role?: string;
  $text: Person;
}

export interface IOtp {
  id?: string;
  user: string;
  token: number;
  expired: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILocation {
  id: string;
  longitude: number;
  latitude: number;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotification {
  id: string;
  user: string;
  message: string;
  title: string;
  status: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFile {
  location?: string;
}

export interface Search {
  $search: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  phone: string;
}

export interface Error {
  message: string;
}

export interface IPlan {
  id: string;
  name: string;
  duration: number;
  price: number;
  discount?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransaction {
  amount: number;
  status: string;
  coach: string;
  client: string;
  type: string;
  reference: string;
}
