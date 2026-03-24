import { Router } from "express"
import {servicoController} from "../controllers/servico.controller.js"
const serviceRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(serviceRoute.getAll, servicoController.getAll)
router.get(serviceRoute.getById, servicoController.get)
router.post(serviceRoute.create, servicoController.createServico)
router.put(serviceRoute.update, servicoController.update)
router.delete(serviceRoute.delete, servicoController.delete)

export { router }