import { Request, Response } from "express";
import httpStatus from "http-status";
import RoleByInteraction from '../../application/modules/roleByInteraction.application';
import { RoleByComponentSettingsType } from "../../routes/schemas/modules";

export async function createRoleByInteraction(req: Request<{ id: string }, any, RoleByComponentSettingsType>, res: Response) {
    const roleByInteraction = req.body;
    await RoleByInteraction.create(roleByInteraction);
    res.sendStatus(httpStatus.OK);
}

export async function updateActivity(req: Request<{ id: string; }>, res: Response) {
    const { id: guildId } = req.params;
    const { active } = req.query as unknown as { active: boolean; };
    await RoleByInteraction.updateActivity(guildId, active);
    res.sendStatus(httpStatus.OK);
}