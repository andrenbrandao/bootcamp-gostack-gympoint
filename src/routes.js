import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

const router = new Router();

router.post('/sessions', SessionController.store);

export default router;
