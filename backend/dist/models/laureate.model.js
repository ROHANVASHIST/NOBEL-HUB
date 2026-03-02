"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaureateModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const laureateSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
// Add text index for searching
laureateSchema.index({ fullName: 'text', motivation: 'text', nationality: 'text' });
laureateSchema.index({ category: 1 });
laureateSchema.index({ year: -1 });
exports.LaureateModel = mongoose_1.default.model('Laureate', laureateSchema);
