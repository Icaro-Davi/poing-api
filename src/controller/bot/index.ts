import { Request, Response } from "express";
import httpStatus from "http-status";
import BotApplication from "../../application/bot.application";
import { IBotSchema } from "../../domain/db_poing/bot/Bot.schema";

export async function getGuildSettings(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const botGuild = await BotApplication.getGuildById(id);
    res.send(botGuild);
}

export async function updateGuildSettings(req: Request<{ id: string }, {}, IBotSchema>, res: Response) {
    const { id } = req.params;
    const botSettings = req.body;
    await BotApplication.updateSettings(id, botSettings);
    res.sendStatus(httpStatus.OK);
}