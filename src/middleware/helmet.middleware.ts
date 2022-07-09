import { Express } from 'express';
import helmet from 'helmet';

const HelmetMiddleware = (app: Express) => {
    app.use(helmet());
}

export default { middleware: HelmetMiddleware, priority: 1 };