import httpStatus from "http-status";
import ModuleApplication from "../../application/module.application";

import type { Request, Response } from "express";
import type { IWelcomeMemberModuleSettings } from "../../domain/db_poing/modules/welcomeModule/WelcomeModule.schema";
import type { Types } from "mongoose";

export async function create(req: Request<{ id: string }, any, IWelcomeMemberModuleSettings>, res: Response) {
    const { id } = req.params;
    const welcomeMemberSettings = req.body;
    await ModuleApplication.createWelcomeMember(id, welcomeMemberSettings);
    return res.sendStatus(httpStatus.CREATED);
}

export async function getByGuildId(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const welcomeMemberSettings = await ModuleApplication.getWelcomeMemberSettingsByGuildId(id, { populate: true });
    if (!welcomeMemberSettings) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.send(welcomeMemberSettings);
}

export async function update(req: Request<{ id: string }, any, IWelcomeMemberModuleSettings>, res: Response) {
    const { id } = req.params;
    const welcomeMember = req.body;
    const _welcomeModule = await ModuleApplication.getWelcomeMemberSettingsByGuildId(id, { populate: false });
    if (_welcomeModule?.settings)
        await ModuleApplication.updateWelcomeMemberSettings((_welcomeModule?.settings as Types.ObjectId), welcomeMember);
    return res.sendStatus(httpStatus.OK);
}
