import Joi from "joi";
import { CreateCustomerData } from "../utils";

export const validateCustomer = Joi.object<CreateCustomerData>({
  firstName: Joi.string(),
  lastName: Joi.string(),
  dob: Joi.string(),
  gender: Joi.string().valid("male", "female", "others"),
});
