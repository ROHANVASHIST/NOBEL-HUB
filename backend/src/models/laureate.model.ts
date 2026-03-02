import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ILaureate extends Document {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    birthYear: number;
    birthPlace: string;
    nationality: string;
    photo: string;
    category: string;
    year: number;
    motivation: string;
    biography: string;
    institution: string;
    lectureCount: number;
    paperCount: number;
    isAlive: boolean;
    externalUrl?: string;
}

const laureateSchema = new Schema<ILaureate>(
    {
        id: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        fullName: { type: String, required: true },
        birthYear: { type: Number },
        birthPlace: { type: String },
        nationality: { type: String },
        photo: { type: String },
        category: { type: String, required: true },
        year: { type: Number, required: true },
        motivation: { type: String },
        biography: { type: String },
        institution: { type: String },
        lectureCount: { type: Number, default: 0 },
        paperCount: { type: Number, default: 0 },
        isAlive: { type: Boolean, default: false },
        externalUrl: { type: String },
    },
    {
        timestamps: true,
    }
);

// Add text index for searching
laureateSchema.index({ fullName: 'text', motivation: 'text', nationality: 'text' });
laureateSchema.index({ category: 1 });
laureateSchema.index({ year: -1 });

export const LaureateModel: Model<ILaureate> = mongoose.model<ILaureate>('Laureate', laureateSchema);
