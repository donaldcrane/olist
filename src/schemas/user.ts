import Joi from "joi";
import {
  CreateUserData,
  locationData,
  LoginData,
  resendData,
  resetData,
  verifyData,
} from "../utils";

export const registerSchema = Joi.object<CreateUserData>({
  username: Joi.string().min(2).max(20).required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(6).max(16),
  phone: Joi.string().required(),
});

export const loginSchema = Joi.object<LoginData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const emailSchema = Joi.object<resendData>({
  email: Joi.string().email().required(),
});

export const tokenSchema = Joi.object<verifyData>({
  token: Joi.number().required(),
});
export const resetSchema = Joi.object<resetData>({
  token: Joi.number().required(),
  password: Joi.string().required(),
  retypePassword: Joi.string().required(),
});
export const locationSchema = Joi.object<locationData>({
  longitude: Joi.string().required(),
  latitude: Joi.string().required(),
  address: Joi.string().required(),
});
