import { Router } from 'express';
import * as laureateController from '../../controllers/laureate.controller';

const router = Router();

router.get('/', laureateController.getLaureates);
router.get('/:id', laureateController.getLaureateById);

export default router;
