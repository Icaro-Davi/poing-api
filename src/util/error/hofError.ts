import { NextFunction, Request, Response } from "express";

type ControllerFunctionType = (req: Request<any>, res: Response, next?: NextFunction) => any | void;

function useErrorHandler(fn: ControllerFunctionType) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

export default useErrorHandler;