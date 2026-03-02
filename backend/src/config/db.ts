import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.mongoUri, {
            // Options are effectively defaults in Mongoose 6+
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
