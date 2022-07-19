import { Express } from 'express';
import passport from "passport";
import { Strategy } from 'passport-discord';

import User from '../application/user.application';
import configs from '../configs';
import BaseError from '../util/error';

const PassportMiddleware = (app: Express) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user: any, done) => {
        return done(null, user._id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await User.findById(id);
            if (user) return done(null, user);
            done(null, null);
        } catch (error) {
            return done(new BaseError({
                log: '[APP] Error on passport deserialize.',
                methodName: 'deserializeUser',
                error
            }), undefined);
        }
    });

    passport.use(
        new Strategy({
            clientID: configs.env.discord.CLIENT_ID,
            clientSecret: configs.env.discord.CLIENT_SECRET,
            callbackURL: configs.env.discord.REDIRECT_URL,
            scope: ['identify', 'email', 'guilds']
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const { id } = profile;
                const user = await User.findAndUpdate(id, { accessToken, refreshToken });
                if (user) return done(null, user);
                const newUser = await User.create({ _id: id, accessToken, refreshToken });
                if (newUser) return done(null, newUser);
            } catch (error: any) {
                return done(new BaseError({
                    log: '[APP] Error on passport discord strategy.',
                    methodName: 'new Strategy',
                    message: error?.message,
                    error
                }), undefined);
            }
        })
    );
}

export default { middleware: PassportMiddleware, priority: 3 };