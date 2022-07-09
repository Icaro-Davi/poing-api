import { Express } from 'express';
import cors from 'cors';

const CorsMiddleware = (app: Express) => {
    app.use(cors({
        origin: ['http://localhost:3000'],
        credentials: true
    }));
}

export default { middleware: CorsMiddleware, priority: 1 };