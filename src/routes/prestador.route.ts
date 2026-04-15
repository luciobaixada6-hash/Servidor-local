import { Router } from "express"
import { PrestadorController } from "../controllers/prestador.controller.js"
import authMiddleware, { authorize } from "../security/auth.minddleware.js"
import { PropostaController } from "../controllers/proposta.controller.js"
import { Role } from "../utils/type.js"

const PrestadorRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()
router.get(PrestadorRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), PropostaController.getAll)

router.post(PrestadorRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), PrestadorController.create)

router.use(authMiddleware)

router.get(PrestadorRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), PrestadorController.get)

router.put(PrestadorRoute.update, authorize([Role.ADMIN]),PrestadorController.update)

router.delete(PrestadorRoute.delete, authorize([Role.ADMIN]), PrestadorController.delete)

export { router }