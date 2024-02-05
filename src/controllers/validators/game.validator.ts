import Joi from 'joi';

export const startGameSchema = Joi.object({
  player1: Joi.string().required(),
  player2: Joi.string(),
  startNumber: Joi.number().required(),
});

export const joinGameSchema = Joi.object({
  player2: Joi.string().required(),
  inputNumber: Joi.number().valid(-1, 0, 1).optional()
});

export const makeMoveSchema = Joi.object({
  inputNumber: Joi.number().valid(-1, 0, 1).required()
});