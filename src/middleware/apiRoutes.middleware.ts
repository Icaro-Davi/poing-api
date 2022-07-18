import { Express } from 'express';
import routes from '../routes';

function routesMiddleware(app: Express) {
    app.use('/api', routes);
}

export default { middleware: routesMiddleware, priority: 4 };