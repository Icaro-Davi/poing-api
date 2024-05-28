import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import configs from "../configs";
import httpStatus from "http-status";
import { sessionStore } from "./session.middleware";
import { SessionData } from "express-session";

type MiddlewareFnType = (request: Request, response: Response, next: NextFunction) => void;
type SessionWithPassport = SessionData & { passport: { user: string } };

const authenticationStrategy = (middleware: MiddlewareFnType): MiddlewareFnType => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const hasSessionCookie = req.headers.cookie?.includes('user-session');
        if (!hasSessionCookie) {
            const authorization = req.headers.authorization?.split(' ') as [string, string];
            if (authorization && authorization[0] === 'Bearer' && !!authorization[1]) {
                const JWToken = authorization[1];
                return jwt.verify(JWToken, configs.env.server.SECRET, (err, payload) => {
                    if (err) return res.status(httpStatus.FORBIDDEN).send({ err: httpStatus[httpStatus.FORBIDDEN] });
                    if (typeof payload === 'object') {
                        return sessionStore.get(payload.sessionID, (err, session) => {
                            if (err || !session) 
                                return res.status(httpStatus.FORBIDDEN).send({ err: httpStatus[httpStatus.FORBIDDEN] });
                            if (payload.userID !== (session as SessionWithPassport).passport.user) 
                                return res.status(httpStatus.UNAUTHORIZED).send({ err: httpStatus[httpStatus.UNAUTHORIZED] });
                            req.sessionID = payload.sessionID;
                            req.session = {
                                ...session,
                                destroy(callback) {
                                    sessionStore.destroy(req.sessionID, callback);
                                },
                            } as typeof req.session;
                            return next();
                        });
                    }
                });
            }
        }
        middleware(req, res, next);
    }
}

export default { middleware: authenticationStrategy, ignore: true };