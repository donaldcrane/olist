/* eslint-disable @typescript-eslint/no-empty-interface */
declare global {
  namespace Express {
    interface User extends userData {}
    interface Request extends CustomRequest {}
  }
}

export interface CustomRequest {
  user: unknown | null;
  file: object;
  params: object;
  query: object;
  path: object;
}
export interface userData {
  seller_id?: string;
  password?: string;
}
export interface AccountData {
  city: string;
  state: string;
}

export interface filterItems {
  sort: number;
  page: number;
  limit: number;
}

export interface IData {
  data?: string;
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
