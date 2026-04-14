import { GCProfiler } from "node:v8";
import { serviceModel } from "../models/servico.models.js";
import type { ResponseType, serviceDBType } from "../utils/type.js"
import type { Request, Response } from "express"


export const servicoController = {

    async createServico(req: Request, res: Response) {
        const newServico: serviceDBType = req.body

        if (!newServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const createServiceResponse = await serviceModel.create(newServico)

        if (!createServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "error ao criar servico",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<typeof createServiceResponse> = {
            status: "success",
            message: "servico criado com sucesso",
            data: createServiceResponse
        }
        return res.status(200).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllServiceResponse: serviceDBType[] | null = await serviceModel.getAll()
        if (!getAllServiceResponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao buscar servidor",
                data: null
            })
        }

        const response: ResponseType<typeof getAllServiceResponse> = {
            status: "success",
            message: "servico buscado com sucesso ",
            data: getAllServiceResponse
        }
        return res.status(200).json(response)
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

        const updateServiceResponse = await serviceModel.update(id as string, updatService)

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
    },

    getAllServicoDetalhado(req: Request, res: Response) {
        const { limit, offset } = req.query

        let LIMIT = 10
        let OFFSET = 0

        if (limit && parseInt(limit as string) > 0) {
            LIMIT = parseInt(limit as string)
        }

        if (offset && parseInt(offset as string) >= 0) {
            OFFSET = parseInt(offset as string)
        }

        const getAllServicoDetalhadoResponse = serviceModel.getAllServicoDetalhado(LIMIT, OFFSET)

        if (!getAllServicoDetalhadoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servicos detalhados",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<typeof getAllServicoDetalhadoResponse> = {
            status: "success",
            message: "Servicos detalhados buscados com sucesso",
            data: getAllServicoDetalhadoResponse
        }
        return res.status(200).json(response)

    }
}
