import Joi from "joi";

export const accountSchema = Joi.object({
  seller_city: Joi.string(),
  seller_state: Joi.string(),
});
