import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacao-servico.controller.js"
import { Role } from "../utils/type.js"
import authMiddleware, { authorize } from "../security/auth.minddleware.js"
import { ro } from "date-fns/locale"

const PrestacaoServicoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllPrestacaoservicoDetalhado: "/get-all-detalhado",
    getByCategoria: "/categoria/:categoria"
}

const router = Router()

router.post(PrestacaoServicoRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), PrestacaoServicoController.create)

router.get(PrestacaoServicoRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), PrestacaoServicoController.getAll)

router.get(PrestacaoServicoRoute.getByCategoria, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), PrestacaoServicoController.getAllPrestacoesServicoBycategoria)

router.use(authMiddleware)

router.get(PrestacaoServicoRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), PrestacaoServicoController.get)

router.put(PrestacaoServicoRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), PrestacaoServicoController.update)

router.delete(PrestacaoServicoRoute.delete, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), PrestacaoServicoController.delete)

router.get(PrestacaoServicoRoute.getAllPrestacaoservicoDetalhado,  authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR,  Role.EMPRESA]), PrestacaoServicoController.getAllPrestacaoServicoDetalhado)

export { router }
