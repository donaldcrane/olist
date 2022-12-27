import Joi from "joi";
import { updateSellerData } from "../utils";

export const validateSeller = Joi.object<updateSellerData>({
  firstName: Joi.string(),
  lastName: Joi.string(),
  dob: Joi.string(),
  businessName: Joi.string(),
  businessType: Joi.string(),
  contact: Joi.string(),
  gender: Joi.string().valid("male", "female", "others"),
});
