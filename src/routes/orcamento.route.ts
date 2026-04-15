import { Router } from "express"
import { OrcamentoController } from "../controllers/orcamento.controller.js"
import { Role } from "../utils/type.js"
import authMiddleware, { authorize } from "../security/auth.minddleware.js"

const OrcamentoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.use(authMiddleware)

router.post(OrcamentoRoute.create, authorize([Role.ADMIN]), OrcamentoController.create)

router.get(OrcamentoRoute.getAll,  authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]),OrcamentoController.getAll)

router.get(OrcamentoRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), OrcamentoController.get)

router.put(OrcamentoRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), OrcamentoController.update)

router.delete(OrcamentoRoute.delete, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]),    OrcamentoController.delete)

export { router }
