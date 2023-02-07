import httpStatus from 'http-status';
import { RoleByComponentSettingsType } from '../../routes/schemas/modules';
import BotService from '../../services/discord/bot';
import BaseError from '../../util/error';
import DiscordChannelUtils from '../../util/discord/channel';
import DiscordComponentStyleUtil from '../../util/discord/ComponentStyle';
import { MessageSelectOption } from '../../services/discord/bot/types';
import RoleByInteractionRepository from '../../domain/db_poing/modules/roleByInteractionModule/RoleByInteractionRepository.mongo';

const LOG_TITLE = '[ROLE_BY_INTERACTION_APPLICATION]';

class RoleByInteraction {

    static async create(roleByInteractionSettings: RoleByComponentSettingsType) {
        try {
            const { channelId, isMessageText, messageText, components: discordComponents, messageEmbed } = roleByInteractionSettings;
            const componentReference = 'role-by-component';
            const components = discordComponents.map(actionRowComponent => ({
                ...actionRowComponent,
                type: DiscordChannelUtils.translateTypesToCode(actionRowComponent.type as string) as number,
                components: actionRowComponent.components?.map(randomComponent => {
                    const { type, roleId, style, options, ...restComponent } = randomComponent as typeof randomComponent & { roleId: string; style?: string, options?: MessageSelectOption[] };
                    const buttonData = { id: Math.random().toString(32).slice(6), roleId: roleId };
                    return {
                        ...restComponent,
                        ...options ? { options: options.map(option => ({ ...option, value: option.value })) } : {},
                        ...style ? { style: DiscordComponentStyleUtil.translateStyleTypeToCode(style) } : {},
                        type: DiscordChannelUtils.translateTypesToCode(type as string) as number,
                        custom_id: `${componentReference}:${JSON.stringify(buttonData)}`
                    };
                })
            }));

            const color = parseInt(messageEmbed?.color.replace('#', '') ?? 'FFFFFF', 16);
            const embed = {
                color,
                title: messageEmbed?.title,
                description: messageEmbed?.description,
                fields: messageEmbed?.fields ?? [],
                ...messageEmbed?.author?.name
                    ? { author: { name: messageEmbed?.author?.name, icon_url: messageEmbed?.author?.picture } }
                    : {},
                ...messageEmbed?.thumbnail
                    ? { thumbnail: { url: messageEmbed.thumbnail } }
                    : {},
                ...messageEmbed?.footer
                    ? { footer: { text: messageEmbed.footer } }
                    : {},
            }

            await BotService.sendChannelMessage(channelId, {
                ...(
                    isMessageText
                        ? { components, content: messageText, }
                        : { components, embeds: [embed] }
                )
            });
        } catch (error: any) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to create a role by interaction.`,
                methodName: 'create',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on create an interactive message with guild roles.',
                error: error.response.data
            });
        }
    }

    static async updateActivity(guildId: string, active: boolean){
        try {
            await RoleByInteractionRepository.updateActivity(guildId, active);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failet to update role by interaction activity`,
                methodName: 'updateActivity',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on update role by interaction activity',
                error
            });
        }
    }

}

export default RoleByInteraction;