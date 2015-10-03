
import { Router } from 'express';
import http from './core/HttpClient';

const host = 'https://api.github.com/';
const router = new Router();

router.get('/', async (req, res, next) => {
    try {
        let path = req.query.path;

        return http.get(host + 'events');
    } catch (err) {
        next(err);
    }
});

export default router;