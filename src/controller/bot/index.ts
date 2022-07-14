import { Request, Response } from "express";
import BotApplication from "../../application/bot.application";

export async function getGuilds(req: Request, res: Response) {
    try {
        const guilds = await BotApplication.getGuilds();
        return res.send(guilds);
    } catch (error: any) {
        return res.status(400).send({ msg: 'Error finding bot guilds.' });
    }
}