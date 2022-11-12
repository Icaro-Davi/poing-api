import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import UserApplication from "../application/user.application";

/**
 * This middleware only works when pass a guild id as param
 */
async function verifyUserCanModifyGuild(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const isAllowedToModifyGuild = await UserApplication.verifyGuildPermissions(id, { user: req.user! });
        if(isAllowedToModifyGuild) {
            next()
        } else {
            res.status(httpStatus.UNAUTHORIZED).send({ err: httpStatus[httpStatus.UNAUTHORIZED] })
        }
    } catch (error) {
        next(error);
    }
}

export default { middleware: verifyUserCanModifyGuild, ignore: true };