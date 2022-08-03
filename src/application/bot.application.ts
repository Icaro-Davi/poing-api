import httpStatus from "http-status";
import BotRepository from "../domain/db_poing/guild/GuildRepository";
import BaseError from "../util/error";

const LOG_TITLE = '[BOT_APPLICATION]';

class BotApplication {

    static async getGuildById(guildId: string) {
        try {
            const botGuild = await BotRepository.findById(guildId);
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

}

export default BotApplication;