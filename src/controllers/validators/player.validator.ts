import Joi from 'joi';

export const registerPlayerSchema = Joi.object({
    email: Joi.string().required(),
  });

  export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });