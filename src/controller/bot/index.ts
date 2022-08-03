import { Request, Response } from "express";
import BotApplication from "../../application/bot.application";

export async function getGuild(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const botGuild = await BotApplication.getGuildById(id);
    res.send(botGuild);
}