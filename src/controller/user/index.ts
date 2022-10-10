import { Request, Response } from "express";
import UserApplication from "../../application/user.application";
import AppCache from "../../lib/AppCache";

export async function guilds(req: Request, res: Response) {
    const guilds = await UserApplication.getGuildsWithManagePermission(req.user!.accessToken);
    AppCache.save(AppCache.createKey('GUILDS_USER_ID', req.user?._id), guilds);
    res.send(guilds);
}

export async function me(req: Request, res: Response) {
    const user = await UserApplication.getMe(req.user!.accessToken);
    res.send(user);
}