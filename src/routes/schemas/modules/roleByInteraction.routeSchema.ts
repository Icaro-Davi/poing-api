import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { MessageEmbedType } from "../../../domain/db_poing/modules/memberWelcomeModule/WelcomeModule.schema";
import { Components, ComponentSelectMenu, DiscordMessageComponent } from "../../../services/discord/bot/types";
import HexColor from "../defaults/HexColor";
import Component from "../defaults/message/Component";
import MessageEmbedSchema from "../defaults/message/Embed";
import MessageText from "../defaults/message/Text";
import Snowflake from "../defaults/Snowflake";

export type RoleByComponentSettingsType = {
    channelId: string;
    isMessageText: string;
    messageText?: string;
    messageEmbed?: MessageEmbedType & { color: string };
    components: DiscordMessageComponent<{ roleId: string }>[];
}

const validator = createValidator();

export const RoleByInteraction = {
    settingsValidator: validator.body(
        Joi.object<RoleByComponentSettingsType>({
            channelId: Snowflake,
            isMessageText: Joi.boolean().required(),
            messageText: Joi.alternatives().conditional('isMessageText', {
                is: true,
                then: MessageText,
                otherwise: Joi.forbidden()
            }),
            messageEmbed: Joi.alternatives().conditional('isMessageText', {
                is: false,
                then: MessageEmbedSchema({ color: HexColor.required() })
            }),
            components: Joi.array().items(Joi.object<DiscordMessageComponent<{ roleId: string }>>({
                type: Joi.valid('ACTION_ROW'),
                components: Joi.array().items(
                    Component.button({ roleId: Snowflake.required() }),
                    Component.selectMenu()
                ).min(1).max(5)
                    .messages({
                        'components.type_1': 'Action Row supports only components same type',
                        'components.type_2': 'An Action Row can contain only one select menu',
                        'components.options.equal_values': 'All values must be unique'
                    })
                    .custom((value: Components[], helpers) => {
                        const index = value.findIndex(component => component.type !== value[0].type);
                        if (index > 0) {
                            return helpers.error('components.type_1');
                        }
                        if (value[0].type === 'STRING_SELECT') {
                            if (value.length > 1) return helpers.error('components.type_2');
                            const haveDuplicatedValuesInOptions = (value[0] as ComponentSelectMenu).options
                                .some(option => (value[0] as ComponentSelectMenu).options.filter(_option => option.value === _option.value).length > 1)
                            if (haveDuplicatedValuesInOptions) {
                                return helpers.error('components.options.equal_values');
                            }
                        }
                        return value;
                    })
            })).min(1).max(5)
        })
    )
};