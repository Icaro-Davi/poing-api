import { NextFunction, Request, Response, Express } from "express";
import httpStatus from "http-status";
import BaseError from "../util/error";

function ErrorHandlerMiddleware(app: Express) {
    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        if (err) {
            if (err instanceof BaseError) {
                return res.status(err.httpCode || httpStatus.INTERNAL_SERVER_ERROR).send({
                    ...err.message ? { msg: err.message } : {}
                });
            }
            else if (err?.code === 'invalid_client') {
                throw new BaseError({
                    log: '[MIDDLEWARE] Error on passport discord strategy.',
                    message: err?.message,
                    methodName: 'discord new Strategy',
                    isOperational: false,
                    error: err
                });
            }
            return res.status(500).send({
                msg: httpStatus[500]
            });
        } else {
            next();
        }
    });
}



export default { middleware: ErrorHandlerMiddleware };