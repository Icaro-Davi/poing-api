import { Request, Response } from "express";
import httpStatus from "http-status";

export async function discord(req: Request, res: Response) {
    res.sendStatus(httpStatus.OK);
}

export async function discordRedirect(req: Request, res: Response) {
    res.send({ msg: 'Authenticated' });
}

export async function status(req: Request, res: Response) {
    res.sendStatus(httpStatus.OK);
}