import { Request, Response } from "express";
import BotApplication from "../../application/bot.application";

export async function getGuilds(req: Request, res: Response) {
    const guilds = await BotApplication.getGuilds();
    res.send(guilds);
}