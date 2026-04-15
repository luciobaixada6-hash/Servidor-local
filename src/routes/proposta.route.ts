import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"
import { Role } from "../utils/type.js"
import { authorize } from "../security/auth.minddleware.js"


const propostaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(propostaRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.getAll)

router.get(propostaRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.get)

router.use(authorize)

router.post(propostaRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.create)

router.put(propostaRoute.update, authorize([Role.ADMIN]), PropostaController.update)

router.delete(propostaRoute.delete, authorize([Role.ADMIN]), PropostaController.delete) 


export { router }