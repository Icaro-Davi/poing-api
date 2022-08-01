import mongoose, { Connection, MongooseError } from 'mongoose';
import { DBName } from '.';
import configs from '..';
import BaseError from '../../util/error';

async function ConnectPoing() {
    const connection = mongoose.createConnection(configs.env.db.POING_URI);
    return new Promise<Connection>((resolve, reject) => {
        connection.on('connected', () => {
            console.log(`[APP] Connected to mongoDB: ${DBName.poing}.`);
            resolve(connection);
        });
        connection.on('error', (error: MongooseError) => {
            reject(new BaseError({
                log: `[APP] Failed to connect to mongodb`,
                message: error.message,
                methodName: 'ConnectPoing',
                isOperational: false,
                error
            }));
        });
    });
}

export default ConnectPoing;