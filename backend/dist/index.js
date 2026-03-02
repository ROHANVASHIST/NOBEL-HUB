"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const startServer = async () => {
    await (0, db_1.connectDB)();
    const server = app_1.default.listen(env_1.env.port, () => {
        console.log(`[server]: Server is running at http://localhost:${env_1.env.port} in ${env_1.env.nodeEnv} mode`);
    });
    // Handle unexpected errors globally
    const unexpectedErrorHandler = (error) => {
        console.error('Unhandled Exception/Rejection:', error);
        if (server) {
            server.close(() => {
                console.log('Server closed');
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    };
    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully');
        if (server) {
            server.close();
        }
    });
};
startServer();
