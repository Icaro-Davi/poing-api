import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import BotService from "../services/discord/bot";
import { BotChannel } from "../services/discord/bot/types";

/**
 * This middleware only works when pass a guild id as param and must a callback that returns a channelId
 */
function handleCallback(
    getChannelIdCallback: (req: Request) => string,
    options?: {
        validateCallback?: (channel: BotChannel) => boolean;
    }
) {
    async function verifyUserCanModifyGuild(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: paramGuildId } = req.params;
            const channelId = getChannelIdCallback(req);
            const sendUnauthorizedStatus = (customMessage?: string) => res.headersSent && res.status(httpStatus.UNAUTHORIZED).send({ err: customMessage ?? httpStatus[httpStatus.UNAUTHORIZED] });

            const { data: channel } = await BotService.getChannel(channelId)
                .catch(err => {
                    if (err?.response?.data?.code === 50001) {
                        sendUnauthorizedStatus();
                    } else if (err?.response?.data?.code === 10003) {
                        sendUnauthorizedStatus();
                    }
                    throw err;
                });
            if (options?.validateCallback?.(channel)) sendUnauthorizedStatus();
            if (paramGuildId === channel.guild_id) next();
            else !res.headersSent && res.status(httpStatus.UNAUTHORIZED).send({ err: httpStatus[httpStatus.UNAUTHORIZED] });
        } catch (error) {
            !res.headersSent && next(error);
        }
    }
    return verifyUserCanModifyGuild
}

export default { middleware: handleCallback, ignore: true };