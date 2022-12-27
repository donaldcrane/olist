export interface CreateUserData {
  email: string;
  password: string;
  phone: string;
  username: string;
}

export interface UserData {
  id: number;
  email: string;
  password: string;
  username: string;
  phone: string;
  role: string;
  googleId?: string | null;
  facebookId?: string | null;
  twitterId?: string | null;
  appleId?: string | null;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface resendData {
  email: string;
}

export interface verifyData {
  token: number;
}

export interface resetData {
  token: number;
  password: string;
  retypePassword: string;
}

export interface recoverFilterData {
  type: string;
}

export enum UserRole {
  CUSTOMER = "customer",
  SELLER = "seller",
  ADMIN = "admin",
}
