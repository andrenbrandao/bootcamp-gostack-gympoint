import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

const router = new Router();

router.post('/sessions', SessionController.store);
router.get('/students', StudentController.index);
router.post('/students', StudentController.store);
router.put('/students/:id', StudentController.update);

export default router;
