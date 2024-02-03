import Joi from 'joi';

export const startGameSchema = Joi.object({
  player1: Joi.string().required(),
  player2: Joi.string(),
  startNumber: Joi.number().required(),
});

export const joinGameSchema = Joi.object({
  player2: Joi.string().required(),
  startNumber: Joi.number().required(),
});