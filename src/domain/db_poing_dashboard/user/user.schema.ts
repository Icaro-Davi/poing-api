import mongoose from 'mongoose';
import configs from '../../../configs';

export interface IUser {
    _id: string;
    accessToken: string;
    refreshToken: string;
}

const UserSchema = new mongoose.Schema<IUser>({
    _id: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    accessToken: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    refreshToken: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
});

export default configs.db.getConnection('poingDashboard').model('users', UserSchema);