import mongoose from 'mongoose';
import configs from '..';

async function ConnectMongodb() {
    await mongoose.connect(configs.env.db.MONGODB_URI)
        .then(() => {
            console.log('[APP] Connected to mongoDB.');
        })
        .catch((err) => {
            console.error('[APP] Failed to connect to mongodb');
            throw err;
        });
}

export default ConnectMongodb;