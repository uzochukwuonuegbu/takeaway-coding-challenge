import Joi from 'joi';

export const registerPlayerSchema = Joi.object({
    email: Joi.string().required(),
  });