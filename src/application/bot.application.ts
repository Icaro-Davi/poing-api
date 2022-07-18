import httpStatus from "http-status";
import BotService from "../services/discord/bot";
import BaseError from "../util/error";

const LOG_TITTLE = '[BOT_APPLICATION]';

class BotApplication {

    static async getGuilds() {
        try {
            const { data } = await BotService.getGuilds();
            if (!data) throw new BaseError({
                log: `${LOG_TITTLE} Guilds not found.`,
                message: 'Guilds not found',
                methodName: 'getGuilds',
                httpCode: httpStatus.NOT_FOUND
            });
            return data;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITTLE} Error on find guilds`,
                message: 'Error on try search guilds',
                methodName: 'getGuilds',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                error
            });
        }
    }

}

export default BotApplication;