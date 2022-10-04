import Joi from "joi";
import { createValidator } from "express-joi-validation";

import type { IWelcomeMemberModuleSettings } from "../../domain/db_poing/modules/welcomeModule/WelcomeModule.schema";
import type { PickReference } from "../../util/util.types";

const validator = createValidator();

export const paramId = validator.params(
    Joi.object({
        id: Joi.string().required()
    })
);

type MessageEmbedType = PickReference<IWelcomeMemberModuleSettings, 'messageEmbed'>;
const welcomeMember = {
    bodySettings: validator.body(
        Joi.object<IWelcomeMemberModuleSettings>({
            channelId: Joi.string().regex(/^\d$/).max(50),
            isMessageText: Joi.boolean().required(),
            messageText: Joi.string().max(500),
            messageEmbed: Joi.object<MessageEmbedType>({
                author: Joi.object({
                    name: Joi.string().max(50),
                    picture: Joi.string().max(50)
                }),
                fields: Joi.array().items(
                    Joi.object({
                        name: Joi.string().max(50),
                        value: Joi.string().max(50),
                        inline: Joi.boolean()
                    })
                ),
                title: Joi.string().max(100),
                description: Joi.string().max(500),
                footer: Joi.string().max(50),
                thumbnail: Joi.string().max(50),
            })
        })
    )
}

export const modules = {
    welcomeMember
}