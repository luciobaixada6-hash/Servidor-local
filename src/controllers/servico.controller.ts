import { serviceModel } from "../models/servico.models.js";
import { deleteService, updateService } from "../servico.js";
import type { serviceDBType } from "../utils/type.js"
import type { Request, Response } from "express"


export const servicoController = {

    async createServico(req: Request, res: Response) {
        const newServico: serviceDBType = req.body

        if (!newServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null,
            })
        }

        const createServiceResponse = await serviceModel.create(newServico)

        if (!createServiceResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "error ao criar servico",
                data: null
            })
        }

        res.status(200).json({
            status: "sucess",
            message: "servico criado com sucesso",
            data: createServiceResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllServiceREswponse = await serviceModel.getAll()
        if (!getAllServiceREswponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao buscar servidor",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "servico buscado com sucesso ",
            data: getAllServiceREswponse
        })

    },
    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do servico ao fornecido",
                data: null
            })
        }
        const getServiceResponse = await serviceModel.get(id as string);

        if (!getServiceResponse) {
            return res.status(404).json({
                status: "error",
                message: "servico nao encontrado",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "servico encontrado com sucesso ",
            data: getServiceResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;

        const updatService: serviceDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: " error ao atualizar servico",
                data: null
            })
        }

        const updateServiceResponse = await updateService(id as string, updatService)

        return res.status(200).json({
            status: "sucess",
            message: "servico atualizado com sucesso",
            data: updateServiceResponse
        })
    },

    async delete(req: Request, res: Response) {

        const { id } = req.params;


        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null
            });
        }

        const deleteServiceResponse = await serviceModel.delete(id as string)

        if (!deleteServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: " error ao apagar servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "servico apagado com sucesso",
            data: deleteServiceResponse
        })
    }
};


