"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const env_1 = require("../config/env");
const notFoundHandler = (req, res, next) => {
    next(new ApiError_1.ApiError(404, 'Not found'));
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || 'Internal Server Error';
    if (err instanceof ApiError_1.ApiError) {
        statusCode = err.statusCode;
    }
    res.locals.errorMessage = err.message;
    const response = {
        success: false,
        code: statusCode,
        message,
        ...(env_1.env.nodeEnv === 'development' && { stack: err.stack }),
    };
    if (env_1.env.nodeEnv === 'development') {
        console.error(`[Error] ${statusCode} - ${message}\n${err.stack}`);
    }
    else {
        console.error(`[Error] ${statusCode} - ${message}`);
    }
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
