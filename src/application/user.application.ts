import { AxiosError } from "axios";
import httpStatus from "http-status";

import { IUser } from "../domain/user/user.schema";
import UserRepository from "../domain/user/userRepository";
import BotService from "../services/discord/bot";
import UserService from "../services/discord/user";
import { UserGuildsType } from "../services/discord/user/types";
import DiscordUtils, { DiscordPermissionsTypes } from "../util/discord";
import BaseError from "../util/error";

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
                    } else {
                        if ((current.reason as AxiosError).response?.status !== httpStatus.FORBIDDEN)
                            throw current.reason;
                    }
                    return prev;
                }, [] as UserGuildsType[]);

            return [
                ...userGuildsWithBot,
                ...userGuilds.map(userGuild => ({
                    ...userGuild,
                    hasBot: false,
                    permissions: DiscordUtils.extractPermissions(parseInt(userGuild.permissions as string))
                }))
            ]
        } catch (error) {
            throw new BaseError({
                log: `${LOG_TITTLE} Error on find mutual guilds`,
                message: 'Cannot find mutual guilds.',
                methodName: 'getGuildsWithPermission',
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                error
            });
        }
    }

}

export default UserApplication;