import MongoStore from 'connect-mongo';
import { Express } from 'express';
import session from 'express-session';
import configs from '../configs';

const ExpressSessionMiddleware = (app: Express) => {
    app.use(session({
        secret: configs.env.server.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 * 60 * 24 },
        store: MongoStore.create({
            mongoUrl: configs.env.db.MONGODB_URI
        })
    }));
}

export default { middleware: ExpressSessionMiddleware, priority: 2 };