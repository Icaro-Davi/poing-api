import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

export const getGuildById = validator.params(
    Joi.object({
        id: Joi.string().regex(/^\d+$/).required()
    })
);