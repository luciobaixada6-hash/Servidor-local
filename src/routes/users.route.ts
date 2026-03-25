
import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';

const router = Router();

router.get('/users',  UsersController.getAll);
router.get('/users/:id',  UsersController.getOne);
router.post('/users',  UsersController.create);
router.put('/users/:id', UsersController.update);
router.delete('/users/:id', UsersController.delete);

export default router;