import httpStatus from "http-status";
import { WelcomeMemberApplication, WelcomeMemberSettingsTestType } from "../../application/module.application";

import type { Request, Response } from "express";
import type { IWelcomeMemberModuleSettings } from "../../domain/db_poing/modules/memberWelcomeModule/WelcomeModule.schema";

export async function create(req: Request<{ id: string }, any, IWelcomeMemberModuleSettings>, res: Response) {
    const { id } = req.params;
    const welcomeMemberSettings = req.body;
    await WelcomeMemberApplication.createWelcomeMember(id, welcomeMemberSettings);
    return res.sendStatus(httpStatus.CREATED);
}

export async function getByGuildId(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const welcomeMemberSettings = await WelcomeMemberApplication.getWelcomeMemberSettingsByGuildId(id);
    if (!welcomeMemberSettings) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.send(welcomeMemberSettings);
}

export async function update(req: Request<{ id: string }, any, IWelcomeMemberModuleSettings>, res: Response) {
    const { id } = req.params;
    const welcomeMember = req.body;
    const settings = (await WelcomeMemberApplication.getWelcomeMemberSettingsByGuildId(id)).settings as IWelcomeMemberModuleSettings;
    if (typeof settings !== 'string') {
        const welcomeMemberSettingsUpdated: IWelcomeMemberModuleSettings = welcomeMember.isMessageText
            ? { ...settings, messageText: welcomeMember.messageText }
            : { ...settings, messageEmbed: welcomeMember.messageEmbed };
        await WelcomeMemberApplication.updateWelcomeMemberSettings(settings?._id, welcomeMemberSettingsUpdated);
        return res.sendStatus(httpStatus.OK);
    }
    res.sendStatus(httpStatus.NOT_FOUND);
}

export async function updateActivity(req: Request<{ id: string }>, res: Response) {
    const { id: guildId } = req.params;
    const { active } = req.query as unknown as { active: boolean };
    await WelcomeMemberApplication.updateWelcomeMemberActivity(guildId, active);
    res.sendStatus(httpStatus.OK);
}

export async function testWelcomeMemberMessage(req: Request<{ id: string }, any, WelcomeMemberSettingsTestType>, res: Response) {
    const welcomeMemberSettings = req.body;
    await WelcomeMemberApplication.testMessage(welcomeMemberSettings);
    res.sendStatus(httpStatus.OK);
}