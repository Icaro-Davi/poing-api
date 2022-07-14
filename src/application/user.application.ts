import { IUser } from "../domain/user/user.schema";
import UserRepository from "../domain/user/userRepository";
import UserService from "../services/discord/user";

class UserApplication {

    static async findById(userId: string) {
        try {
            return await UserRepository.findById(userId);
        } catch (error) {
            console.error('[APPLICATION] Error on find user by id.');
            console.error(error);
        }
    }

    static async findAndUpdate(userId: string, update: Omit<IUser, '_id'>) {
        try {
            return await UserRepository.findByIdAndUpdate(userId, update);
        } catch (error) {
            console.error('[APPLICATION] Error on find user by id and update.');
            console.error(error);
        }
    }

    static async create(user: IUser) {
        try {
            return await UserRepository.create(user);
        } catch (error) {
            console.error('[APPLICATION] Error on create new user.');
            console.error(error);
        }
    }

    static async getGuilds(userAuthToken: string) {
        try {
            const { data } = await UserService.getGuilds(userAuthToken);
            return data;
        } catch (error) {
            console.error('[APPLICATION] Error on find guilds');
            console.error(error);
        }
    }

}

export default UserApplication;