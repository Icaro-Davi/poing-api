import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { IWelcomeMemberModuleSettings, MessageEmbedType } from "../../../domain/db_poing/modules/memberWelcomeModule/WelcomeModule.schema";
import { WelcomeMemberSettingsTestType } from "../../../application/module.application";
import MessageEmbedSchema from "../defaults/message/Embed";
import MessageText from "../defaults/message/Text";
import Snowflake from "../defaults/Snowflake";
import HexColor from "../defaults/HexColor";

const validator = createValidator();

export const welcomeMember = {
    settingsValidator: validator.body(
        Joi.object<IWelcomeMemberModuleSettings>({
            _id: Joi.string().hex().length(24),
            channelId: Snowflake,
            isMessageText: Joi.boolean().required(),
            messageText: Joi.alternatives().conditional('isMessageText', {
                is: true,
                then: MessageText,
                otherwise: Joi.forbidden()
            }),
            messageEmbed: Joi.alternatives().conditional('isMessageText', {
                is: false,
                then: MessageEmbedSchema()
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
                then: MessageText,
                otherwise: Joi.forbidden()
            }),
            botSettings: Joi.object({
                messageColor: Joi.string().allow("").max(7),
            }).required(),
            messageEmbed: Joi.alternatives().conditional('isMessageText', {
                is: false,
                then: MessageEmbedSchema({ color: HexColor }),
                otherwise: Joi.forbidden()
            })
        })
    )
}