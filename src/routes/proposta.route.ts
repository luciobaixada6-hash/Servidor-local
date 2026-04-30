import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"
import { Role } from "../utils/type.js"
import { authorize, isOwner } from "../security/auth.minddleware.js"
import { PropostaModel } from "../models/proposta.models.js"


const propostaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    aceitar: "/aceitar/:id"
}

const router = Router()

router.get(propostaRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.getAll)

router.get(propostaRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.get)

router.use(authorize)

router.post(propostaRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.create)

router.put(propostaRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), isOwner(PropostaModel, "owner"),PropostaController.update)

router.delete(propostaRoute.delete, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), isOwner(PropostaModel, "owner"), PropostaController.delete) 

router.put( propostaRoute.aceitar, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.aceitar)

export { router }