import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { IWelcomeMemberModuleSettings, MessageEmbedType } from "../../../domain/db_poing/modules/welcomeModule/WelcomeModule.schema";

const validator = createValidator();

export const welcomeMember = {
    settingsValidator: validator.body(
        Joi.object<IWelcomeMemberModuleSettings>({
            channelId: Joi.string().regex(/^\d+$/).max(50),
            isMessageText: Joi.boolean().required(),
            messageText: Joi.string().allow("").max(500),
            messageEmbed: Joi.object<MessageEmbedType>({
                author: Joi.object({
                    name: Joi.string().allow("").max(50),
                    picture: Joi.string().allow("").max(50)
                }),
                fields: Joi.array().items(
                    Joi.object({
                        name: Joi.string().required().max(100),
                        value: Joi.string().required().max(150),
                        inline: Joi.boolean()
                    })
                ),
                title: Joi.string().allow("").max(100),
                description: Joi.string().allow("").max(500),
                footer: Joi.string().allow("").max(100),
                thumbnail: Joi.string().allow("").max(50),
            })
        })
    ),
    settingsTestValidator: validator.body(
        Joi.object<IWelcomeMemberModuleSettings>({
            channelId: Joi.string().regex(/^\d+$/).max(50).required(),
            isMessageText: Joi.boolean().required(),
            messageText: Joi.string().allow("").max(500),
            messageEmbed: Joi.alternatives().conditional('isMessageText', {
                is: false,
                then: Joi.object<MessageEmbedType & { color?: string }>({
                    author: Joi.object({
                        name: Joi.string().allow("").max(100),
                        picture: Joi.string().allow("").max(100)
                    }),
                    fields: Joi.array().items(
                        Joi.object({
                            name: Joi.string().required().max(100),
                            value: Joi.string().required().max(150),
                            inline: Joi.boolean()
                        })
                    ),
                    color: Joi.string().max(7),
                    title: Joi.string().allow("").max(100),
                    description: Joi.string().max(500),
                    footer: Joi.string().allow("").max(100),
                    thumbnail: Joi.string().max(100),
                }),
                otherwise: Joi.any()
            })
        })
    )
}