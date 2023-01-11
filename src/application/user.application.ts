import httpStatus from "http-status";

import UserRepository from "../domain/db_poing_dashboard/user/userRepository";
import BotService from "../services/discord/bot";
import UserService from "../services/discord/user";
import DiscordUtils, { DiscordPermissionsTypes } from "../util/discord";
import BaseError from "../util/error";

import type { IUser } from "../domain/db_poing_dashboard/user/user.schema";
import type { UserGuildsType } from "../services/discord/user/types";
import AppCache from "../lib/AppCache";

const LOG_TITTLE = '[USER_APPLICATION]';

class UserApplication {

    static async findById(userId: string) {
        try {
            const user = await UserRepository.findById(userId);
            if (!user) throw new BaseError({
                log: `${LOG_TITTLE} User not found`,
                message: "Couldn't find user.",
                httpCode: httpStatus.NOT_FOUND,
                methodName: 'findById'
            });
            return user;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITTLE} Error on find user by id.`,
                message: "Couldn't find user.",
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                methodName: 'findById',
                error
            });
        }
    }

    static async findAndUpdate(userId: string, update: Omit<IUser, '_id'>) {
        try {
            return await UserRepository.findByIdAndUpdate(userId, update);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITTLE} Error on find and update user by id.`,
                message: "Couldn't find or update user.",
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                methodName: 'findAndUpdate',
                error
            });
        }
    }

    static async create(user: IUser) {
        try {
            return await UserRepository.create(user);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITTLE} Error on create new user.`,
                message: "Error on create a new user.",
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                methodName: 'create',
                error
            });
        }
    }

    static async getGuilds(userAuthToken: string) {
        try {
            const { data } = await UserService.getGuilds(userAuthToken);
            if (!data) throw new BaseError({
                log: `${LOG_TITTLE} Guilds not found.`,
                message: "Couldn't find guilds.",
                httpCode: httpStatus.NOT_FOUND,
                methodName: 'findAndUpdate',
            });
            return data;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITTLE} Error on find guilds.`,
                message: "Error on find guilds.",
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                methodName: 'getGuilds',
                error
            });
        }
    }

    static async getGuildsWithManagePermission(userAuthToken: string): Promise<UserGuildsType[]> {
        try {
            const cachedGuilds = await AppCache.get(AppCache.createKey('GUILDS_USER_REF', userAuthToken)) as UserGuildsType[] | undefined;
            if (cachedGuilds?.length) return cachedGuilds;

            const userGuilds = (await this.getGuilds(userAuthToken))
                .filter(userGuild =>
                    DiscordUtils.hasPermissions(parseInt(userGuild.permissions as string), ['ADMINISTRATOR', 'MANAGE_GUILD'], { atLeastOne: true })
                );
            const promiseResponseGuilds = await Promise
                .allSettled(
                    userGuilds.map(userGuild => BotService.getGuild(userGuild.id))
                );

            const userGuildsWithBot = promiseResponseGuilds
                .reduce((prev, current) => {
                    if (current.status === 'fulfilled') {
                        const userGuildIndex = userGuilds.findIndex(userGuild => userGuild.id === current.value.data.id);
                        prev.push({
                            ...userGuilds[userGuildIndex],
                            hasBot: true,
                            permissions: DiscordUtils.extractPermissions(parseInt(userGuilds[userGuildIndex].permissions as string))
                        });
                        userGuilds.splice(userGuildIndex, 1);
                    }
                    return prev;
                }, [] as UserGuildsType[]);

            await AppCache.saveAndGetData(
                AppCache.createKey('GUILDS_USER_REF', userAuthToken),
                async () => userGuildsWithBot
            );

            return (userGuildsWithBot ?? []);
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITTLE} Error on find mutual guilds`,
                message: 'Cannot find mutual guilds.',
                methodName: 'getGuildsWithManagePermission',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                error
            });
        }
    }

    static async verifyGuildPermissions(guildId: string, options: { user: IUser }) {
        try {
            const guilds = await this.getGuildsWithManagePermission(options.user.accessToken);
            const guild = guilds.find(guild => guild.id === guildId);
            if (guild) {
                return DiscordUtils.hasPermissions(guild.permissions as DiscordPermissionsTypes[], ["ADMINISTRATOR", "MANAGE_GUILD"], { atLeastOne: true });
            } else {
                return false;
            }
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITTLE} Failed to check guild permissions`,
                message: 'Failed on check if user has permission to modify guild.',
                methodName: 'verifyGuildPermissions',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                error
            });
        }
    }

    static async getMe(userAuthToken: string) {
        try {
            const { data } = await UserService.getMe(userAuthToken);
            if (!data) throw new BaseError({
                log: `${LOG_TITTLE} user not found.`,
                message: "Couldn't find user.",
                httpCode: httpStatus.NOT_FOUND,
                methodName: 'getMe',
            });
            return data;
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITTLE} Error on get discord user.`,
                message: 'Cannot get discord user.',
                methodName: 'getMe',
                httpCode: httpStatus.NOT_FOUND,
                error
            });
        }
    }

}

export default UserApplication;