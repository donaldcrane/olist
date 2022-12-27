import {
  signInUser,
  resendUserToken,
  resetUserPassword,
  recoverUserAccount,
  verifyUserAccount,
  saveLocation,
} from "../services";
import { controller } from "../core";
import { Controller } from "../utils";
import {
  emailSchema,
  locationSchema,
  loginSchema,
  resetSchema,
  tokenSchema,
} from "../schemas";

export const loginUser: Controller = (req, res) =>
  controller({
    req,
    res,
    service: signInUser,
    validation: { schema: loginSchema },
  });

export const resendToken: Controller = (req, res) =>
  controller({
    req,
    res,
    params: { id: Number(req.params.id) },
    service: resendUserToken,
    validation: { schema: emailSchema },
  });

export const verifyAccount: Controller = (req, res) =>
  controller({
    req,
    res,
    params: { id: Number(req.params.id) },
    service: verifyUserAccount,
    validation: { schema: tokenSchema },
  });

export const recoverAccount: Controller = (req, res) =>
  controller({
    req,
    res,
    params: { id: Number(req.params.id) },
    service: recoverUserAccount,
    validation: { schema: emailSchema },
  });

export const resetPassword: Controller = (req, res) =>
  controller({
    req,
    res,
    params: { id: Number(req.params.id) },
    service: resetUserPassword,
    validation: { schema: resetSchema },
  });

export const createLocation: Controller = (req, res) =>
  controller({
    req,
    res,
    service: saveLocation,
    validation: { schema: locationSchema },
  });
