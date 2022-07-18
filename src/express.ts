import express from 'express';
import configs from './configs';
import { IUser } from './domain/user/user.schema';
import Middleware from './middleware';

import BaseError from './util/error';

declare global {
    namespace Express {
        interface User extends IUser { }
    }
}

async function StartExpressServer() {
    try {
        const app = express();
        await configs.db.connectMongoDB();
        await Middleware(app);
        app.listen(configs.env.server.PORT, () => {
            console.log(`[APP] Running on Port ${configs.env.server.PORT}`);
        });
    } catch (error) {
        console.error('[APP] index');
        if (error instanceof BaseError)
            !error.isOperational && process.exit(1);
        else
            console.error('[APP] Unhandled error', error);
    }
}

export default StartExpressServer;