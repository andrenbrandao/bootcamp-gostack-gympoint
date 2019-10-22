import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import MembershipController from './app/controllers/MembershipController';
import CheckinController from './app/controllers/CheckinController';

import authMiddleware from './app/middlewares/auth';

const router = new Router();

router.post('/sessions', SessionController.store);

// Student routes

router.get('/students/:studentId/checkins', CheckinController.index);
router.post('/students/:studentId/checkins', CheckinController.store);

// Admin routes

router.use(authMiddleware);
router.get('/students', StudentController.index);
router.get('/students/:id', StudentController.show);
router.post('/students', StudentController.store);
router.put('/students/:id', StudentController.update);

router.get('/plans', PlanController.index);
router.get('/plans/:id', PlanController.show);
router.post('/plans', PlanController.store);
router.put('/plans/:id', PlanController.update);
router.delete('/plans/:id', PlanController.delete);

router.get('/memberships', MembershipController.index);
router.post('/memberships', MembershipController.store);
router.put('/memberships/:id', MembershipController.update);
router.delete('/memberships/:id', MembershipController.delete);

export default router;
