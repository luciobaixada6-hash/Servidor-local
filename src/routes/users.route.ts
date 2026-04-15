
import { Router } from 'express';
import { UserController } from '../controllers/users.controller.js'
import authMiddleware, { authorize } from '../security/auth.minddleware.js';
import { Role } from '../utils/type.js';

const userRoute = {
    create: "/create",
    getById: "/id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    resetPassWord: "/reset-password",
    login: "/login"
}

const router = Router();

router.post( userRoute.login, UserController.login)

router.post(  userRoute.create,  UserController.create)

router.use(authMiddleware)

router.get( userRoute.getAll, authorize([Role.ADMIN]), UserController.getAll);

router.get( userRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), UserController.getById);

router.put( userRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), UserController.update);

router.delete( userRoute.delete, authorize([Role.ADMIN]), UserController.delete);

router.put(userRoute.resetPassWord, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),UserController.resetPassWord)

export { router };