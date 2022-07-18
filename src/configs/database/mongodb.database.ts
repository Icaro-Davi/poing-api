import mongoose, { MongooseError } from 'mongoose';
import configs from '..';
import BaseError from '../../util/error';

async function ConnectMongodb() {
    await mongoose.connect(configs.env.db.MONGODB_URI)
        .then(() => {
            console.log('[APP] Connected to mongoDB.');
        })
        .catch((error: MongooseError) => {
            throw new BaseError({
                log: `[APP] Failed to connect to mongodb`,
                message: error.message,
                methodName: 'ConnectMongodb',
                isOperational: false,
                error
            });
        });
}

export default ConnectMongodb;