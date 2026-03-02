import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(404, 'Not found'));
};

export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = err.message || 'Internal Server Error';

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
    }

    res.locals.errorMessage = err.message;

    const response = {
        success: false,
        code: statusCode,
        message,
        ...(env.nodeEnv === 'development' && { stack: err.stack }),
    };

    if (env.nodeEnv === 'development') {
        console.error(`[Error] ${statusCode} - ${message}\n${err.stack}`);
    } else {
        console.error(`[Error] ${statusCode} - ${message}`);
    }

    res.status(statusCode).json(response);
};
