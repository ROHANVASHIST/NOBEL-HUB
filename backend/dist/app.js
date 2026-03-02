"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const v1_1 = __importDefault(require("./routes/v1"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
// Set security HTTP headers
app.use((0, helmet_1.default)());
// Parse JSON request body
app.use(express_1.default.json());
// Parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// Enable CORS
app.use((0, cors_1.default)());
// HTTP request logger
if (env_1.env.nodeEnv !== 'test') {
    app.use((0, morgan_1.default)('dev'));
}
// API v1 routes
app.use('/api/v1', v1_1.default);
// Welcome route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to NobelHub API Service',
    });
});
// Handle unknown API routes
app.use(error_middleware_1.notFoundHandler);
// Centralized error handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
