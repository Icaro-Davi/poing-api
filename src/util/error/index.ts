// https://github.com/yaircohendev/nodejs-typescript-starter/blob/main/src/app.ts
import { AxiosError } from 'axios';
import status from 'http-status';
import configs from '../../configs';

interface IBaseError {
    log: string;
    message?: string | unknown;
    httpCode?: number;
    isOperational?: boolean;
    methodName?: string;
    error?: unknown | any | BaseError;
}

class BaseError extends Error {
    public readonly log: string;
    public readonly httpCode: number;
    public readonly isOperational: boolean;
    public readonly methodName?: string;
    public readonly error?: unknown | any | BaseError;

    constructor({ log, message = log, methodName, error, httpCode = status.INTERNAL_SERVER_ERROR, isOperational = true }: IBaseError) {
        if (error instanceof BaseError) throw error;
        const errMessage = typeof error === 'string'
            ? error
            : error?.response?.statusText
            || error?.message
            || (message as string);

        super(errMessage);
        Object.setPrototypeOf(this, new.target.prototype);

        this.log = log;
        this.methodName = methodName;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.error = error;

        if (error instanceof AxiosError) this.httpCode = error.response?.status || httpCode;

        Error.captureStackTrace(this);
        (configs.env.dev.logErro || this.httpCode === status.INTERNAL_SERVER_ERROR) && this.loggerError();
    }

    public loggerError() {
        console.group(this.log, this.methodName || '');
        configs.env.dev.printStackError && console.error(this);
        console.groupEnd();
    }
}

export default BaseError;