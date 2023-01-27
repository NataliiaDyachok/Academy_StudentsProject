import Joi from 'joi';
import EnumEventType from '../enums/enumEvents.js';

const attackValidation = (data) => {
  const schema = Joi.object({
    type: Joi.string()
      .valid(...Object.values(EnumEventType))
      .required(),
    userId: Joi.number().required(),
  });

  return schema.validate(data);
};

const messageValidation = (data) => {
  const schema = Joi.object({
    type: Joi.string()
      .valid(...Object.values(EnumEventType))
      .required(),
    message: Joi.string().min(1).max(2000).required(),
  });

  return schema.validate(data);
};

const restoreValidation = (data) => {
  const schema = Joi.object({
    type: Joi.string()
      .valid(...Object.values(EnumEventType))
      .required(),
  });

  return schema.validate(data);
};

const abilityValidation = (data) => {
  const schema = Joi.object({
    type: Joi.string()
      .valid(...Object.values(EnumEventType))
      .required(),
  });

  return schema.validate(data);
};

export default {
  attackValidation,
  messageValidation,
  restoreValidation,
  abilityValidation,
};
