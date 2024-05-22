import MongoStore from 'connect-mongo';
import { Express } from 'express';
import session from 'express-session';
import configs from '../configs';

const ExpressSessionMiddleware = (app: Express) => {
    app.use(session({
        name: 'user-session',
        secret: configs.env.server.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
            maxAge: 60000 * 60 * 24 * configs.env.session.cookieExpirationDays,
            ...configs.env.session.cookieDomain ? { domain: configs.env.misc.WEB_APP_REDIRECT_URL } : {}
        },
        store: MongoStore.create({
            mongoUrl: configs.env.db.POING_DASHBOARD_URI
        })
    }));
}

export default { middleware: ExpressSessionMiddleware, priority: 2 };