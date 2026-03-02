import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
    await connectDB();

    const server = app.listen(env.port, () => {
        console.log(`[server]: Server is running at http://localhost:${env.port} in ${env.nodeEnv} mode`);
    });

    // Handle unexpected errors globally
    const unexpectedErrorHandler = (error: Error) => {
        console.error('Unhandled Exception/Rejection:', error);
        if (server) {
            server.close(() => {
                console.log('Server closed');
                process.exit(1);
            });
        } else {
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
