import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { LaureateModel } from '../models/laureate.model';

export const getLaureates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search = '', category = '', sort = 'year-desc' } = req.query;

        let query: any = {};
        if (search) {
            query.$text = { $search: search as string };
        }
        if (category) {
            query.category = category;
        }

        let sortOption: any = { year: -1 };
        if (sort === 'year-asc') sortOption = { year: 1 };
        if (sort === 'name-asc') sortOption = { lastName: 1 };

        const laureates = await LaureateModel.find(query).sort(sortOption);

        res.status(200).json(new ApiResponse(200, laureates, 'Successfully fetched laureates.'));
    } catch (error) {
        next(error);
    }
};

export const getLaureateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const laureate = await LaureateModel.findOne({ id });

        if (!laureate) {
            throw new ApiError(404, 'Laureate not found');
        }

        res.status(200).json(new ApiResponse(200, laureate, 'Successfully fetched laureate.'));
    } catch (error) {
        next(error);
    }
};
