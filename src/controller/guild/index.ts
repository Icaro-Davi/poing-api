import { Request, Response } from "express";
import GuildApplication from "../../application/guild.application";

export async function getGuilds(req: Request, res: Response) {
    const guilds = await GuildApplication.getGuilds();
    res.send(guilds);
}

export async function getGuildById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const guild = await GuildApplication.getGuildById(id);
    res.send(guild);
}