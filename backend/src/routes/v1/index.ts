import { Router } from 'express';
import laureateRoute from './laureate.route';

const router = Router();

const defaultRoutes = [
    {
        path: '/laureates',
        route: laureateRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
