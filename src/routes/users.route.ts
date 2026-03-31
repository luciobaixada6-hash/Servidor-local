
import { Router } from 'express';
import { UserController } from '../controllers/users.controller.js'
import authMiddleware from '../security/auth.minddleware.js';

const userRoute = {
    create: "/create",
    getById: "/id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login"
}

const router = Router();

router.post( userRoute.login, UserController.login);
router.get( userRoute.getAll, authMiddleware, UserController.getAll);
router.get( userRoute.getById,  UserController.getById);
router.post(  userRoute.create,  UserController.create);
router.put( userRoute.update,  UserController.update);
router.delete( userRoute.delete, UserController.delete);

export { router };