import { Request, Response } from "express";
import UserApplication from "../../application/user.application";

export async function guilds(req: Request, res: Response) {
    const guilds = await UserApplication.getGuilds(req.user!.accessToken);
    res.send(guilds);
}

export async function mutualGuilds(req: Request, res: Response) {
    const guilds = await UserApplication.getMutualGuilds(req.user!.accessToken);
    res.send(guilds);
}