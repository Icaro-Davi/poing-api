import { Express } from 'express';
import cors from 'cors';
import configs from '../configs';

const CorsMiddleware = (app: Express) => {
    const allowedOrigin = configs.env.environment === 'development'
        ? configs.env.server.allowedOrigins ?? new RegExp('^https?://localhost(:[\\d]{2,4})?$')
        : configs.env.server.allowedOrigins;
    app.use(cors({
        origin: allowedOrigin,
        credentials: true
    }));
}

export default { middleware: CorsMiddleware, priority: 1 };