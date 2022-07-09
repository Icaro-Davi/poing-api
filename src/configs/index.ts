import env from './env.config';
import connectMongoDB from './database/mongodb.database';

export default {
    env,
    db: {
        connectMongoDB
    }
}