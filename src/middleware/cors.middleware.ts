import { Express } from 'express';
import cors from 'cors';
import configs from '../configs';

const CorsMiddleware = (app: Express) => {
    app.use(cors({
        origin: configs.env.environment === 'development'
            ? new RegExp('^https?://localhost(:[\\d]{2,4})?$')
            : configs.env.server.allowedOrigins,
        credentials: true
    }));
}

export default { middleware: CorsMiddleware, priority: 1 };