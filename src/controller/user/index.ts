import { Request, Response } from "express";
import UserApplication from "../../application/user.application";

export async function guilds(req: Request, res: Response) {
    try {
        const guilds = await UserApplication.getGuilds(req.user!.accessToken);
        res.send(guilds);
    } catch (error) {
        res.sendStatus(400);
    }
}