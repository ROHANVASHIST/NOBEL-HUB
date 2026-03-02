"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLaureateById = exports.getLaureates = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const laureate_model_1 = require("../models/laureate.model");
const getLaureates = async (req, res, next) => {
    try {
        const { search = '', category = '', sort = 'year-desc' } = req.query;
        let query = {};
        if (search) {
            query.$text = { $search: search };
        }
        if (category) {
            query.category = category;
        }
        let sortOption = { year: -1 };
        if (sort === 'year-asc')
            sortOption = { year: 1 };
        if (sort === 'name-asc')
            sortOption = { lastName: 1 };
        const laureates = await laureate_model_1.LaureateModel.find(query).sort(sortOption);
        res.status(200).json(new ApiResponse_1.ApiResponse(200, laureates, 'Successfully fetched laureates.'));
    }
    catch (error) {
        next(error);
    }
};
exports.getLaureates = getLaureates;
const getLaureateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const laureate = await laureate_model_1.LaureateModel.findOne({ id });
        if (!laureate) {
            throw new ApiError_1.ApiError(404, 'Laureate not found');
        }
        res.status(200).json(new ApiResponse_1.ApiResponse(200, laureate, 'Successfully fetched laureate.'));
    }
    catch (error) {
        next(error);
    }
};
exports.getLaureateById = getLaureateById;
