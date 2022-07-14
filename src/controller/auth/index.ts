import { Request, Response } from "express";

export async function discord(req: Request, res: Response) {
    res.sendStatus(200);
}

export async function discordRedirect(req: Request, res: Response) {
    res.send({ msg: 'Authenticated' });
}

export async function status(req: Request, res: Response) {
    res.send(req.user);
}