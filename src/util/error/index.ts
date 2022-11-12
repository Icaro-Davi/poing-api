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
    path?: string;
}

class BaseError extends Error {
    public readonly log: string;
    public readonly httpCode: number;
    public readonly isOperational: boolean;
    public readonly methodName?: string;
    public readonly error?: unknown | any | BaseError | Error;
    public readonly path?: string;

    constructor({ log, message = log, methodName, error, httpCode = status.INTERNAL_SERVER_ERROR, isOperational = true }: IBaseError) {
        const errMessage = typeof error === 'string'
            ? error
            : error?.response?.statusText
            || error?.message
            || (message as string);

        super(errMessage);

        this.log = log;
        this.methodName = methodName;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.error = error;
        this.path = `(${log.split(' ')[0]}:${methodName})`;

        Object.setPrototypeOf(this, new.target.prototype);

        if (error instanceof BaseError) {
            this.path = `${error.path} ==> ${this.path}`;
            this.loggerError({ log, error, httpCode, isOperational, message, methodName, path: this.path });
            throw { ...error, path: this.path };
        }
        else if (error instanceof AxiosError) this.httpCode = error.response?.status || httpCode;
        else if (error instanceof Error) this.log += ` "Error name: ${error.name}"`;

        Error.captureStackTrace(this);

        this.loggerError({ log, error, httpCode, isOperational, message, methodName, path: this.path });
        !this.isOperational && process.exit(1);
    }

    public loggerError(options: IBaseError) {
        if (configs.env.dev.logErro || options.httpCode === status.INTERNAL_SERVER_ERROR) {
            console.group(options.log);
            console.error('- - Method Name:', options.methodName || 'Unknown');
            console.error('- - Error Path:', options.path || 'Unknown');
            if (configs.env.dev.printStackError) {
                let { log, methodName, ...rest } = options;
                console.error('- - Http Code:', rest.httpCode);
                console.error('- - Is Operational:', rest.isOperational);
                rest.error && import('util').then(util => {
                    console.error(util.inspect(rest.error, false, null, true));
                });
            } else {
                console.error('- - Message:', options.message || 'Unknown');
            }
            console.groupEnd();
        }
    }
}

export default BaseError;