import httpStatus from "http-status";
import BaseError from "../../util/error";
import GuildRepository from "../../domain/db_poing/guild/GuildRepository.mongo";
import MemberLeaveModuleRepository from "../../domain/db_poing/modules/memberLeaveModule/MemberLeaveModuleRepository.mongo";
import { WelcomeMemberApplication } from "./welcomeMember.application";
import { MemberLeaveTestMessageType } from "./memberLeave.types";
import BotApplication from "../bot.application";

import type { IMemberLeaveModule } from "../../domain/db_poing/modules/memberLeaveModule/MemberLeaveModule.schema";
import type { Types } from "mongoose";

const LOG_TITLE = '[MEMBER_LEAVE_APPLICATION]';

export class MemberLeaveApplication {

    static async create(guildId: string, memberLeaveSettings: IMemberLeaveModule){
        try {
            const guild = await BotApplication.getGuildById(guildId);
            if (!guild?.modules?.memberLeave?.settings) {
                await MemberLeaveModuleRepository.create(guildId, memberLeaveSettings);
            } else {
                throw new BaseError({
                    log: `${LOG_TITLE} Module memberLeave already created.`,
                    methodName: 'create',
                    httpCode: httpStatus.BAD_REQUEST,
                    message: 'This module is already created, if you want to update use the appropriate route!'
                });
            }
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to create memberLeave module.`,
                methodName: 'create',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on create WelcomeMember module',
                error
            });
        }
    }

    static async getSettingsByGuildId(guildId: string){
        try {
            const module = await GuildRepository.getModuleSettingsByName(guildId, 'memberLeave', { populate: true });
            if (!module?.settings)
                throw new BaseError({
                    log: `${LOG_TITLE} failed search memberLeaveSettings by guildId`,
                    methodName: 'getSettingsByGuildId',
                    httpCode: httpStatus.NOT_FOUND,
                    message: 'Could\'t find member leave settings module by guild id',
                });
            return module;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Error on try find welcome module by guildId`,
                methodName: 'getWelcomeMemberSettingsById',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on try find module memberLeave by guild id',
                error
            });
        }
    }

    static async updateSettings(memberLeaveModuleId: Types.ObjectId, memberLeaveSettings: IMemberLeaveModule){
        try {
            await MemberLeaveModuleRepository.update(memberLeaveModuleId, memberLeaveSettings);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to update memberLeave module.`,
                methodName: 'updateSettings',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on update memberLeave module',
                error
            });
        }
    }

    static async updateActivity(guildId: string, isActive: boolean){
        try {
            await MemberLeaveModuleRepository.updateActivity(guildId, isActive);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to update memberLeave module activity.`,
                methodName: 'updateActivity',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on update member leave module activity',
                error
            });
        }
    }

    static async testMessage(memberLeaveSettings: MemberLeaveTestMessageType){
        try {
            await WelcomeMemberApplication.testMessage(memberLeaveSettings);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to send message to discord channel.`,
                methodName: 'testMessage',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on test message',
                error
            });
        }
    }
}

export default MemberLeaveApplication;