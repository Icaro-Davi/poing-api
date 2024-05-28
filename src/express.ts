import express from 'express';
import configs from './configs';
import createDatabase from './configs/database';
import { IUser } from './domain/db_poing_dashboard/user/user.schema';
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

        configs.db = await createDatabase();
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