import express from 'express';
import configs from './configs';
import { IUser } from './domain/user/user.schema';
import Middleware from './middleware';
import routes from './routes';

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
        app.use('/api', routes);
        app.listen(configs.env.server.PORT, () => {
            console.log(`[APP] Running on Port ${configs.env.server.PORT}`);
        });
    } catch (error) {
        console.log('[APP] Error on ./src/express.ts');
        console.error(error);
    }
}

export default StartExpressServer;