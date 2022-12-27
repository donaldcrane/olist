import {
  registerCustomer,
  updateCustomerProfileImage,
  updateCustomerProfile,
  fetchAllCustomers,
} from "../../services";
import { controller } from "../../core";
import { Controller } from "../../utils";
import { registerSchema, validateCustomer } from "../../schemas";

export const saveCustomer: Controller = (req, res) =>
  controller({
    req,
    res,
    service: registerCustomer,
    validation: { schema: registerSchema },
  });

export const updateProfile: Controller = (req, res) =>
  controller({
    req,
    res,
    service: updateCustomerProfile,
    validation: { schema: validateCustomer },
  });

export const updateProfileImage: Controller = (req, res) =>
  controller({
    req,
    res,
    service: updateCustomerProfileImage,
  });

export const getAllCustomers: Controller = (req, res) =>
  controller({
    req,
    res,
    service: fetchAllCustomers,
  });
