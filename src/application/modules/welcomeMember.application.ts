import httpStatus from "http-status";
import WelcomeModuleRepository from "../../domain/db_poing/modules/welcomeModule/WelcomeModuleRepository.mongo";
import BaseError from "../../util/error";
import BotApplication from "../bot.application";
import GuildRepository from "../../domain/db_poing/guild/GuildRepository.mongo";
import BotService from "../../services/discord/bot";

import type { IWelcomeMemberModuleSettings } from "../../domain/db_poing/modules/welcomeModule/WelcomeModule.schema";
import type { Types } from "mongoose";
import type { WelcomeMemberSettingsTestType } from "./welcomeMember.type";

const LOG_TITLE = '[WELCOME MEMBER MODULE APPLICATION]';

export class WelcomeMember {
    static async getWelcomeMemberSettingsByGuildId(guildId: string, options: { populate: boolean }) {
        try {
            const moduleSettings = await GuildRepository.getWelcomeModuleSettings(guildId, options);
            if (!moduleSettings)
                throw new BaseError({
                    log: `${LOG_TITLE} failed search welcomeMemberSettings by guildId`,
                    methodName: 'getWelcomeMemberSettingsByGuildId',
                    httpCode: httpStatus.NOT_FOUND,
                    message: 'Could\'t find welcome settings module by guild id',
                });
            return moduleSettings;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Error on try find welcome module by guildId`,
                methodName: 'getWelcomeMemberSettingsById',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on try find welcome module guild id',
                error
            });
        }
    }
    static async createWelcomeMember(guildId: string, welcomeMemberSettings: IWelcomeMemberModuleSettings) {
        try {
            const guild = await BotApplication.getGuildById(guildId);
            if (!guild?.modules?.welcomeMember?.settings) {
                await WelcomeModuleRepository.create(guildId, welcomeMemberSettings);
            } else {
                throw new BaseError({
                    log: `${LOG_TITLE} Module welcomeMember already created.`,
                    methodName: 'createWelcomeMember',
                    httpCode: httpStatus.BAD_REQUEST,
                    message: 'This module is already created, if you want to update use the appropriate route!'
                });
            }
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to create welcomeMember module.`,
                methodName: 'getWelcomeMemberSettingsById',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on create WelcomeMember module',
                error
            });
        }
    }
    static async updateWelcomeMemberSettings(welcomeMemberModuleId: Types.ObjectId, welcomeMemberSettings: IWelcomeMemberModuleSettings) {
        try {
            await WelcomeModuleRepository.update(welcomeMemberModuleId, welcomeMemberSettings);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to update welcomeMember module.`,
                methodName: 'getWelcomeMemberSettingsById',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on update WelcomeMember module',
                error
            });
        }
    }

    static async updateWelcomeMemberActivity(guildId: string, isActive: boolean) {
        try {
            await WelcomeModuleRepository.updateActivity(guildId, isActive);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to update welcomeMember activity.`,
                methodName: 'updateWelcomeMemberActivity',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on update WelcomeMember activity',
                error
            });
        }
    }

    static async testMessage(welcomeMemberSettings: WelcomeMemberSettingsTestType) {
        try {
            const channelId = welcomeMemberSettings.channelId!;
            const isTextMessage = welcomeMemberSettings.isMessageText!;

            const color = parseInt(welcomeMemberSettings.messageEmbed.color.replace('#', '') ?? 'FFFFFF', 16);
            await BotService.sendChannelMessage(channelId, {
                ...isTextMessage
                    ? { content: welcomeMemberSettings.messageText || '🐔' }
                    : {
                        embeds: [
                            {
                                color,
                                title: welcomeMemberSettings.messageEmbed.title,
                                description: welcomeMemberSettings.messageEmbed.description,
                                fields: welcomeMemberSettings.messageEmbed.fields ?? [],
                                ...welcomeMemberSettings.messageEmbed?.author?.name ? {
                                    author: {
                                        name: welcomeMemberSettings.messageEmbed?.author?.name,
                                        icon_url: welcomeMemberSettings.messageEmbed?.author?.picture
                                    }
                                } : {},
                                ...welcomeMemberSettings.messageEmbed.thumbnail ? {
                                    thumbnail: {
                                        url: welcomeMemberSettings.messageEmbed.thumbnail
                                    },
                                } : {},
                                ...welcomeMemberSettings.messageEmbed.footer ? {
                                    footer: {
                                        text: welcomeMemberSettings.messageEmbed.footer,
                                    },
                                } : {},
                            }
                        ]
                    }
            });
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to send message to discord channel.`,
                methodName: 'testMessage',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on test message',
                error
            });
        }
    }
}
