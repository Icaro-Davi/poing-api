import MongoStore from 'connect-mongo';
import { Express } from 'express';
import session, { SessionOptions } from 'express-session';
import configs from '../configs';
import authenticateStrategyMiddleware from './authenticateStrategy.middleware';

export const sessionStore = MongoStore.create({ mongoUrl: configs.env.db.POING_DASHBOARD_URI });

const ExpressSessionMiddleware = (app: Express) => {
    const sessionConfig: SessionOptions = {
        name: 'user-session',
        secret: configs.env.server.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * configs.env.session.cookieExpirationDays,
            sameSite: configs.env.session.cookieSameSite,
            httpOnly: configs.env.session.cookieHttpOnly,
            secure: configs.env.session.secure,
            ...configs.env.session.cookieDomain ? {
                domain: configs.env.session.cookieDomain
            } : {}
        },
        store: sessionStore
    }
    app.use(authenticateStrategyMiddleware.middleware(session(sessionConfig)));
}

export default { middleware: ExpressSessionMiddleware, priority: 2 };