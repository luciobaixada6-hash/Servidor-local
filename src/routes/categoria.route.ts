import { Router } from "express"
import { CategoriaController } from "../controllers/categoria.controller.js"
import authMiddleware, { authorize } from "../security/auth.minddleware.js"
import { Role } from "../utils/type.js"

const CategoriaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(CategoriaRoute.create, authorize([Role.ADMIN]), CategoriaController.create)

router.use(authMiddleware)

router.get(CategoriaRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.getAll)

router.get(CategoriaRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.get)

router.put(CategoriaRoute.update, authorize([Role.ADMIN]), CategoriaController.update)

router.delete(CategoriaRoute.delete, authorize([Role.ADMIN]), CategoriaController.delete)

export { router }