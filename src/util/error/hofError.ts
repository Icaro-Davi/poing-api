import { NextFunction, Request, Response } from "express";

type ControllerFunctionType = (req: Request, res: Response, next?: NextFunction) => any | void;

function useErrorHandler(fn: ControllerFunctionType) {
    return function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

export default useErrorHandler;