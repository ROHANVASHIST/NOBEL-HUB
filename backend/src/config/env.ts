import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '5000', 10),
    corsOrigin: process.env.CORS_ORIGIN || '*',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/nobelhub',
};
