import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

const router = new Router();

router.post('/sessions', SessionController.store);
router.post('/students', StudentController.store);

export default router;
