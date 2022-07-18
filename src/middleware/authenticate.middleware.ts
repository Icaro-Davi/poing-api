import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

const isAuthenticatedMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return req.user ? next() : res.status(httpStatus.UNAUTHORIZED).send({ err: httpStatus[httpStatus.UNAUTHORIZED] });
}

export default { middleware: isAuthenticatedMiddleware, ignore: true };