import { Request, Response } from "express";
import httpStatus from "http-status";
import { MemberLeaveApplication } from "../../application/module.application";

import type { MemberLeaveTestMessageType } from "../../application/modules/memberLeave.types";
import type { IMemberLeaveModule } from "../../domain/db_poing/modules/memberLeaveModule/MemberLeaveModule.schema";

export const create = async (req: Request<{ id: string }, any, IMemberLeaveModule>, res: Response) => {
    const { id } = req.params;
    const memberLeaveSettings = req.body;
    await MemberLeaveApplication.create(id, memberLeaveSettings);
    res.sendStatus(httpStatus.OK);
}

export const getByGuildId = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const memberLeaveSettings = await MemberLeaveApplication.getSettingsByGuildId(id);
    if (!memberLeaveSettings) return res.sendStatus(httpStatus.NOT_FOUND);
    res.json(memberLeaveSettings);
}

export const update = async (req: Request<{ id: string }, any, IMemberLeaveModule>, res: Response) => {
    const { id } = req.params;
    const { messageEmbed, messageText, _id, ...memberLeaveSettings } = req.body;
    const settings = (await MemberLeaveApplication.getSettingsByGuildId(id)).settings as IMemberLeaveModule;
    if (typeof settings !== 'string') {
        const welcomeMemberSettingsUpdated: IMemberLeaveModule = memberLeaveSettings.isMessageText
            ? { ...settings, ...memberLeaveSettings, messageText }
            : { ...settings, ...memberLeaveSettings, messageEmbed };
        await MemberLeaveApplication.updateSettings(settings?._id, welcomeMemberSettingsUpdated);
        return res.sendStatus(httpStatus.OK);
    }
    res.sendStatus(httpStatus.NOT_FOUND);
}

export const updateActivity = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { active } = req.query as unknown as { active: boolean };
    await MemberLeaveApplication.updateActivity(id, active);
    res.sendStatus(httpStatus.OK);
}

export const testMessage = async (req: Request<{ id: string; }, any, MemberLeaveTestMessageType>, res: Response) => {
    const memberLeaveSettings = req.body;
    await MemberLeaveApplication.testMessage(memberLeaveSettings);
    res.sendStatus(httpStatus.OK);
}
