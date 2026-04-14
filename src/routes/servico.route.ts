import { Router } from "express"
import {servicoController} from "../controllers/servico.controller.js"
import { authorize } from "../security/auth.minddleware.js"
import { Role } from "../utils/type.js"
const serviceRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllDetailed: "/all-detailed"
}

const router = Router()

router.get(serviceRoute.getAll, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), servicoController.getAll), servicoController.getAll
router.get(serviceRoute.getById, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), servicoController.get), servicoController.get
router.post(serviceRoute.create, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), servicoController.createServico), servicoController.createServico
router.put(serviceRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), servicoController.update), servicoController.update
router.delete(serviceRoute.delete, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), servicoController.delete), servicoController.delete
router.get(serviceRoute.getAllDetailed, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), servicoController.getAllServicoDetalhado)

export default router
export { router }