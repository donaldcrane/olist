import Joi from "joi";

export const accountSchema = Joi.object({
  city: Joi.string(),
  state: Joi.string(),
});
