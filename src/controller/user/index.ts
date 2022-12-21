import { Request, Response } from "express";
import UserApplication from "../../application/user.application";

export async function guilds(req: Request, res: Response) {
    const guilds = await UserApplication.getGuildsWithManagePermission(req.user!.accessToken);
    res.send(guilds);
}

export async function me(req: Request, res: Response) {
    const user = await UserApplication.getMe(req.user!.accessToken);
    res.send(user);
}