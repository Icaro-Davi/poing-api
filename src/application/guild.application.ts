import httpStatus from "http-status";
import BotService from "../services/discord/bot";
import BaseError from "../util/error";

const LOG_TITLE = '[GUILD APPLICATION]';

class GuildApplication {
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
}

export default GuildApplication;