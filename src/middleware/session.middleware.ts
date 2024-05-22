import MongoStore from 'connect-mongo';
import { Express } from 'express';
import session, { SessionOptions } from 'express-session';
import configs from '../configs';

const ExpressSessionMiddleware = (app: Express) => {
    const sessionConfig: SessionOptions = {
        name: 'user-session',
        secret: configs.env.server.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * configs.env.session.cookieExpirationDays,
            sameSite: 'lax',
            httpOnly: true,
            secure: true,
            ...configs.env.session.cookieDomain ? {
                domain: configs.env.session.cookieDomain
            } : {}
        },
        store: MongoStore.create({
            mongoUrl: configs.env.db.POING_DASHBOARD_URI
        })
    }
    app.use((req, res, next) => {
        if (configs.env.environment === 'development') {
            console.log(sessionConfig.cookie);
            const originalNext = next;
            next = (function (...arg) {
                console.log(req.session);
                originalNext.call(this, ...arg as Parameters<typeof next>);
            }) as (this: any, ...args: any[]) => void;
        }
        session(sessionConfig)(req, res, next);
    });
    // app.use(session({
    //     name: 'user-session',
    //     secret: configs.env.server.SECRET,
    //     resave: false,
    //     saveUninitialized: false,
    //     cookie: {
    //         maxAge: 60000 * 60 * 24 * configs.env.session.cookieExpirationDays,
    //         ...configs.env.session.cookieDomain ? {
    //             sameSite: 'lax',
    //             httpOnly: true,
    //             secure: true,
    //             domain: configs.env.session.cookieDomain
    //         } : {}
    //     },
    //     store: MongoStore.create({
    //         mongoUrl: configs.env.db.POING_DASHBOARD_URI
    //     })
    // }));
}

export default { middleware: ExpressSessionMiddleware, priority: 2 };