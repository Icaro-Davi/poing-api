import Joi from "joi";
import Snowflake from "../Snowflake";

import type * as BOT from "../../../../services/discord/bot/types";
import DiscordChannelUtils from "../../../../util/discord/channel";
import DiscordComponentStyleUtil from "../../../../util/discord/ComponentStyle";

const ComponentsTypes = DiscordChannelUtils.ComponentsTypes;
const ComponentStyleTypes = DiscordComponentStyleUtil.ComponentStyleTypes;

const ComponentEmoji = Joi.object({
    id: Snowflake.optional(),
    name: Joi.string().optional(),
    animated: Joi.boolean().optional(),
});

const ComponentLabel = Joi.string().max(80).optional().required();
const ComponentUrl = Joi.string().optional();
const ComponentSelectOptions = Joi.array().items(Joi.object<BOT.MessageSelectOption>({
    label: Joi.string().max(100).required(),
    value: Joi.string().max(100).required(),
    description: Joi.string().max(100).optional(),
    default: Joi.boolean().optional(),
    emoji: ComponentEmoji.optional()
})).min(1).max(25);

const ComponentButton = (CustomConfiguration: { [key: string]: any } = {}) => Joi.object<BOT.ComponentButton>({
    style: Joi.valid(...ComponentStyleTypes),
    type: Joi.valid(ComponentsTypes[1]),
    emoji: ComponentEmoji.optional(),
    label: ComponentLabel,
    url: ComponentUrl,
    ...CustomConfiguration,
});

const ComponentSelectMenu = (CustomConfiguration: { [key: string]: any } = {}) => Joi.object<BOT.ComponentSelectMenu>({
    type: Joi.valid(ComponentsTypes[2], ComponentsTypes[5]),
    options: Joi.alternatives().conditional('type', {
        is: ComponentsTypes[2],
        then: ComponentSelectOptions,
        otherwise: Joi.forbidden()
    }),
    min_values: Joi.number().min(0).max(25),
    max_values: Joi.number().min(0).max(25),
    placeholder: Joi.string().max(150).optional(),
    ...CustomConfiguration,
});

const Component = {
    types: ComponentsTypes,
    emoji: ComponentEmoji,
    button: ComponentButton,
    selectMenu: ComponentSelectMenu,
}

export default Component;