import {
  registerSeller,
  updateSellerProfileImage,
  updateSellerProfile,
  fetchAllSeller,
  saveDocument,
} from "../../services";
import { controller } from "../../core";
import { Controller } from "../../utils";
import { registerSchema, validateSeller } from "../../schemas";

export const saveSeller: Controller = (req, res) =>
  controller({
    req,
    res,
    service: registerSeller,
    validation: { schema: registerSchema },
  });

export const updateSellersProfile: Controller = (req, res) =>
  controller({
    req,
    res,
    service: updateSellerProfile,
    validation: { schema: validateSeller },
  });

export const updateSellersProfileImage: Controller = (req, res) =>
  controller({
    req,
    res,
    service: updateSellerProfileImage,
  });

export const getAllSellers: Controller = (req, res) =>
  controller({
    req,
    res,
    service: fetchAllSeller,
  });

export const createDocument: Controller = (req, res) =>
  controller({
    req,
    res,
    service: saveDocument,
  });
