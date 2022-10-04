import httpStatus from "http-status";
import WelcomeModuleRepository from "../domain/db_poing/modules/welcomeModule/WelcomeModuleRepository.mongo";
import BaseError from "../util/error";
import BotApplication from "./bot.application";
import GuildRepository from "../domain/db_poing/guild/GuildRepository.mongo";

import type { IWelcomeMemberModuleSettings } from "../domain/db_poing/modules/welcomeModule/WelcomeModule.schema";
import type { Types } from "mongoose";

const LOG_TITLE = '[MODULE APPLICATION]';

class ModuleApplication {
    static async getWelcomeMemberSettingsByGuildId(guildId: string, options: { populate: boolean }) {
        try {
            const moduleSettings = await GuildRepository.getWelcomeModuleSettings(guildId, options);
            if (!moduleSettings)
                throw new BaseError({
                    log: `${LOG_TITLE} failed search welcomeMemberSettings by guildId`,
                    methodName: 'getWelcomeMemberSettingsByGuildId',
                    httpCode: httpStatus.NOT_FOUND,
                    message: 'Could\'t find welcome settings module by guild id',
                });
            return moduleSettings;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Error on try find welcome module by guildId`,
                methodName: 'getWelcomeMemberSettingsById',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on try find welcome module guild id',
                error
            });
        }
    }
    static async createWelcomeMember(guildId: string, welcomeMemberSettings: IWelcomeMemberModuleSettings) {
        try {
            const guild = await BotApplication.getGuildById(guildId);
            if (!guild?.modules?.welcomeMember?.settings) {
                await WelcomeModuleRepository.create(guildId, welcomeMemberSettings);
            } else {
                throw new BaseError({
                    log: `${LOG_TITLE} Module welcomeMember already created.`,
                    methodName: 'createWelcomeMember',
                    httpCode: httpStatus.BAD_REQUEST,
                    message: 'This module is already created, if you want to update use the appropriate route!'
                });
            }
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to create welcomeMember module.`,
                methodName: 'getWelcomeMemberSettingsById',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on create WelcomeMember module',
                error
            });
        }
    }
    static async updateWelcomeMemberSettings(welcomeMemberModuleId: Types.ObjectId, welcomeMemberSettings: IWelcomeMemberModuleSettings) {
        try {
            await WelcomeModuleRepository.update(welcomeMemberModuleId, welcomeMemberSettings);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITLE} Failed to update welcomeMember module.`,
                methodName: 'getWelcomeMemberSettingsById',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error on update WelcomeMember module',
                error
            });
        }
    }
}

export default ModuleApplication;