import { Request, Response } from "express";
import httpStatus from "http-status";
import configs from "../../configs";

export async function discord(req: Request, res: Response) {
    res.sendStatus(httpStatus.OK);
}

export async function discordRedirect(req: Request, res: Response) {
    res.redirect(configs.env.misc.WEB_APP_REDIRECT_URL);
}

export async function status(req: Request, res: Response) {
    res.sendStatus(httpStatus.OK);
}

export async function logout(req: Request, res: Response) {
    const status = await new Promise<number>((resolve, reject) => {
        req.session.destroy(err => {
            if (err) reject(err);
            resolve(httpStatus.OK);
        });
    });
    res.sendStatus(status);
}