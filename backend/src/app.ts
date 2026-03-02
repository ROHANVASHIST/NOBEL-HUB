import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import routes from './routes/v1';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

const app: Express = express();

// Set security HTTP headers
app.use(helmet());

// Parse JSON request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// HTTP request logger
if (env.nodeEnv !== 'test') {
    app.use(morgan('dev'));
}

// API v1 routes
app.use('/api/v1', routes);

// Welcome route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to NobelHub API Service',
    });
});

// Handle unknown API routes
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

export default app;
