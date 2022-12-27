import {
  MiddleWare,
  noPermissionError,
  unauthorizedError,
  unknownServerError,
  UserRole,
  validateUserToken,
} from "../utils";
import { findUserByEmail } from "../repos";
import { Customers, Sellers } from "../models";

export const isAuthenticated: MiddleWare = async (req, res, next) => {
  if (!req.get("Authorization"))
    if (req.authOptional) return next();
    else return res.status(401).send({ message: unauthorizedError });
  try {
    const token = (req.header("Authorization") || "Bearer _").split(" ")[1];

    const verified = await validateUserToken(token);
    if (!verified)
      if (req.authOptional) return next();
      else return res.status(401).send({ message: unauthorizedError });

    const { data: userData, error } = await findUserByEmail(verified.email);
    if (error || !userData)
      return res.status(500).send({
        message: error ?? unknownServerError,
      });

    const { seller, customer, ...user } = userData;
    req.user = user;
    req.customer = customer as Customers;
    req.seller = seller as Sellers;
    req.token = token;
    return next();
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: unknownServerError });
  }
};

export const isCustomer: MiddleWare = (req, res, next) => {
  try {
    if (req.user?.role === UserRole.CUSTOMER) return next();
    else return res.status(403).send({ message: noPermissionError });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: unknownServerError });
  }
};
export const isSeller: MiddleWare = (req, res, next) => {
  try {
    if (req.user?.role === UserRole.SELLER) return next();
    else return res.status(403).send({ message: noPermissionError });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: unknownServerError });
  }
};
