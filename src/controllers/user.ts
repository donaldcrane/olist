import { updateSellerAccount, getItems, removeItem } from "../services";
import { controller } from "../core";
import { Controller } from "../utils";
import { accountSchema } from "../schemas";

export const updateAccount: Controller = (req, res) =>
  controller({
    req,
    res,
    service: updateSellerAccount,
    validation: { schema: accountSchema },
  });

export const getOrderItems: Controller = (req, res) =>
  controller({
    req,
    res,
    service: getItems,
  });

export const deleteOrderItems: Controller = (req, res) =>
  controller({
    req,
    res,
    params: { id: Number(req.params.id) },
    service: removeItem,
  });
