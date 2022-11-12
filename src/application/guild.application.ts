import httpStatus from "http-status";
import BotService from "../services/discord/bot";
import BaseError from "../util/error";

const LOG_TITLE = '[GUILD APPLICATION]';

class GuildApplication {

    static async getGuilds() {
        try {
            const { data } = await BotService.getGuilds();
            if (!data) throw new BaseError({
                log: `${LOG_TITLE} Guilds not found.`,
                message: 'Guilds not found',
                methodName: 'getGuilds',
                httpCode: httpStatus.NOT_FOUND
            });
            return data;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Error on find guilds`,
                message: 'Error on try search guilds',
                methodName: 'getGuilds',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                error
            });
        }
    }

    static async getGuildById(guildId: string) {
        try {
            const { data } = await BotService.getGuild(guildId);
            return data;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Guild not found`,
                message: 'Couldn\'t find guild by id',
                methodName: 'getGuildById',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                error
            });
        }
    }

    static async getGuildChannels(guildId: string) {
        try {
            const { data } = await BotService.getChannels(guildId);
            return data;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Channels not found`,
                message: 'Couldn\'t find guild channels',
                methodName: 'getGuildChannels',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                error
            });
        }
    }
}

export default GuildApplication;