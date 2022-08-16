import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

export const paramGuildById = validator.params(
    Joi.object({
        id: Joi.string().regex(/^\d+$/).required()
    })
);

export const bodyGuildSettings = validator.body(
    Joi.object({
        prefix: Joi.string().min(1).max(5).required(),
        messageEmbedHexColor: Joi.string().regex(/^#[0-9A-F]{6}$/i),
        locale: Joi.string().valid('pt-BR', 'en-US'),
        roles: Joi.object({
            muteId: Joi.string()
        })
    })
);