import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { IWelcomeMemberModuleSettings, MessageEmbedType } from "../../../domain/db_poing/modules/memberWelcomeModule/WelcomeModule.schema";
import { WelcomeMemberSettingsTestType } from "../../../application/module.application";

const validator = createValidator();

export const welcomeMember = {
    settingsValidator: validator.body(
        Joi.object<IWelcomeMemberModuleSettings>({
            _id: Joi.string().hex().length(24),
            channelId: Joi.string().regex(/^\d+$/).max(50),
            isMessageText: Joi.boolean().required(),
            messageText: Joi.alternatives().conditional('isMessageText', {
                is: true,
                then: Joi.string().required().max(500),
                otherwise: Joi.forbidden()
            }),
            messageEmbed: Joi.alternatives().conditional('isMessageText', {
                is: false,
                then: Joi.object<MessageEmbedType>({
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
                    title: Joi.string().allow("").max(100),
                    description: Joi.string().required().max(500),
                    footer: Joi.string().allow("").max(100),
                    thumbnail: Joi.string().max(100),
                }),
                otherwise: Joi.forbidden()
            })
        })
    ),
    settingsTestValidator: validator.body(
        Joi.object<WelcomeMemberSettingsTestType>({
            _id: Joi.string().hex().length(24),
            channelId: Joi.string().regex(/^\d+$/).max(50),
            isMessageText: Joi.boolean().required(),
            messageText: Joi.alternatives().conditional('isMessageText', {
                is: true,
                then: Joi.string().required().max(500),
                otherwise: Joi.forbidden()
            }),
            botSettings: Joi.object({
                messageColor: Joi.string().allow("").max(7),
            }).required(),
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
                    description: Joi.string().required().max(500),
                    footer: Joi.string().allow("").max(100),
                    thumbnail: Joi.string().max(100),
                }),
                otherwise: Joi.forbidden()
            })
        })
    )
}