import { Request, Response } from "express";
import GuildService from "../../services/discord/guilds";

export async function getGuilds(req: Request, res: Response) {
    try {
        const { data } = await GuildService.getBotGuilds();
        return res.send(data);
    } catch (error) {
        console.log(error);
        return res.status(400).send({ msg: 'Error finding bot guilds.' });
    }
}