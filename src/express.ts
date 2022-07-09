import express from 'express';
import configs from './configs';
import Middleware from './middleware';
import routes from './routes';

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