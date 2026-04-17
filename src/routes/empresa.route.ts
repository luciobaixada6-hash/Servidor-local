import { Router } from 'express';
import { EmpresaController } from '../controllers/empresa.controller.js'
import authMiddleware, { authorize } from '../security/auth.minddleware.js';
import { Role } from '../utils/type.js';

const empresaRoute = {
    create: "/create",
    getById: "/:id",
    getAll: "/",
    getByUserId: "/user/:id_utilizador",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router();

router.use(authMiddleware)

router.post(empresaRoute.create, authorize([Role.ADMIN, Role.EMPRESA]), EmpresaController.create);

router.get(empresaRoute.getAll, authorize([Role.ADMIN]), EmpresaController.getAll);

router.get(empresaRoute.getById, authorize([Role.ADMIN, Role.EMPRESA]), EmpresaController.getById);

router.get(empresaRoute.getByUserId, authorize([Role.ADMIN, Role.EMPRESA]), EmpresaController.getByUserId);

router.put(empresaRoute.update, authorize([Role.ADMIN, Role.EMPRESA]), EmpresaController.update);

router.delete(empresaRoute.delete, authorize([Role.ADMIN]), EmpresaController.delete);

export { router };