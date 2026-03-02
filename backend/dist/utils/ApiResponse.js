"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    success;
    statusCode;
    data;
    message;
    constructor(statusCode, data = null, message = 'Success') {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}
exports.ApiResponse = ApiResponse;
