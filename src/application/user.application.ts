import { IUser } from "../domain/user/user.schema";
import UserRepository from "../domain/user/userRepository";

class User {

    static async findById(userId: string){
        try {
            return await UserRepository.findById(userId);
        } catch (error) {
            console.error('[APP] Error on find user by id.');
            console.error(error);
        }
    }

    static async findAndUpdate(userId: string, update: Omit<IUser, '_id'>) {
        try {
            return await UserRepository.findByIdAndUpdate(userId, update);
        } catch (error) {
            console.error('[APP] Error on find user');
            console.error(error);
        }
    }

    static async create(user: IUser) {
        try {
            return await UserRepository.create(user);
        } catch (error) {
            console.error('[APP] Error on create new user.');
            console.error(error);
        }
    }

}

export default User;