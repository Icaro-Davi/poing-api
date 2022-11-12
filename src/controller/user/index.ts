import { Request, Response } from "express";
import UserApplication from "../../application/user.application";
import AppCache from "../../lib/AppCache";
import { UserGuildsType } from "../../services/discord/user/types";

export async function guilds(req: Request, res: Response) {
    const guilds = await new Promise<UserGuildsType[]>((resolve, reject) => {
        AppCache.saveAndGetData(
            AppCache.createKey('GUILDS_USER_REF', req.user!.accessToken),
            async () => UserApplication.getGuildsWithManagePermission(req.user!.accessToken)
        ).then(resolve).catch(reject);
    });
    res.send(guilds);
}

export async function me(req: Request, res: Response) {
    const user = await UserApplication.getMe(req.user!.accessToken);
    res.send(user);
}