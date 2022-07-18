import httpStatus from "http-status";
import { IUser } from "../domain/user/user.schema";
import UserRepository from "../domain/user/userRepository";
import UserService from "../services/discord/user";
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

}

export default UserApplication;