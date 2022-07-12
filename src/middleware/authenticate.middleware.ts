import { Request, Response, NextFunction } from 'express';

const isAuthenticatedMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return req.user ? next() : res.status(200).send({ msg: 'Unauthorized' });
}

export default { middleware: isAuthenticatedMiddleware, ignore: true };