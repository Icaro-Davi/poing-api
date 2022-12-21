import httpStatus from "http-status";
import BotRepository from "../domain/db_poing/guild/GuildRepository";
import GuildApplication from "./guild.application";
import BaseError from "../util/error";
import configs from "../configs";

import type { IBotSchema } from "../domain/db_poing/bot/Bot.schema";
import type { IGuildSchema } from "../domain/db_poing/guild/Guild.schema";

const LOG_TITLE = '[BOT_APPLICATION]';

class BotApplication {

    static async getGuildById(guildId: string) {
        try {
            const botGuild = await BotRepository.findById(guildId);
            if (!botGuild) {
                const guild = await GuildApplication.getGuildById(guildId);
                if (!guild) throw new BaseError({
                    log: `${LOG_TITLE} not authorized to create guild without bot in server`,
                    message: 'Bot is not in the server',
                    methodName: 'getGuildById',
                    httpCode: httpStatus.UNAUTHORIZED
                });
                const guildSchema = await this.createGuildSettings({
                    _id: guildId,
                    bot: configs.env.botSettings,
                    modules: {
                        welcomeMember: { isActive: false }
                    }
                });
                return guildSchema;
            }
            return botGuild;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} error on get guild`,
                message: 'Error on search guild by id.',
                methodName: 'getGuildById',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                error
            });
        }
    }

    static async createGuildSettings(guild: IGuildSchema) {
        try {
            return await BotRepository.create(guild);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} error on crate guild`,
                message: 'Error on create guild settings.',
                methodName: 'createGuildSettings',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                error
            });
        }
    }

    static async updateSettings(guildId: string, guildSettings: IBotSchema) {
        try {
            await BotRepository.update(guildId, { bot: guildSettings });
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} error on update guild settings `,
                message: 'Error on update guild settings.',
                methodName: 'updateSettings',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                error
            });
        }
    }

}

export default BotApplication;