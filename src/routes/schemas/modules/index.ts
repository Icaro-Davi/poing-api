import Joi from "joi";
import { createValidator } from "express-joi-validation";

const validator = createValidator();

export const paramId = validator.params(
    Joi.object({
        id: Joi.string().required()
    })
);

export const moduleActivity = validator.query(
    Joi.object().keys({
        active: Joi.boolean().required(),
    })
)

export * from './welcomeMember.routerSchema';