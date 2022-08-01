import User, { IUser } from './user.schema';

class UserRepository {

    static async findById(userId: string) {
        try {
            return (await User.findById(userId))?.toJSON() as IUser;
        } catch (error) {
            throw error;
        }
    }

    static async findByIdAndUpdate(userId: string, update: Omit<IUser, '_id'>) {
        try {
            return (await User.findOneAndUpdate({ _id: userId }, update, { new: true }))?.toJSON() as IUser;
        } catch (error) {
            throw error;
        }
    }

    static async create(user: IUser) {
        try {
            const newUser = new User(user);
            await newUser.save();
            return newUser.toJSON() as IUser;
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;