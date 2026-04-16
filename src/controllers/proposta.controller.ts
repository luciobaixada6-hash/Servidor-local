import { response, type Request, type Response } from "express"
import { PropostaModel } from "../models/proposta.models.js"
import type { PropostaDBType, propostaDBType, ResponseType } from "../utils/type.js"


export const PropostaController = {
    async create(req: Request, res: Response) {
        const propostaData: propostaDBType = req.body

        if (!propostaData) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de proposta inválidos",
                data: null
            };
            return res.status(400).json(response)
        }
        const createPropostaResponse: propostaDBType | null = await PropostaModel.create(propostaData)

        if (!createPropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar proposta",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<propostaDBType> = {
            status: "success",
            message: "Proposta criada com sucesso",
            data: createPropostaResponse
        }
        return res.status(201).json(response)
    },


    async getAll(req: Request, res: Response) {
        try {
            const propostaResponse = await PropostaModel.getAll()

            if (!propostaResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao buscar propostas",
                    data: null
                }
                return res.status(400).json(response)
            }

            const response: ResponseType<typeof propostaResponse> = {
                status: "success",
                message: "Propostas encontradas com sucesso",
                data: propostaResponse
            }
            return res.status(200).json(response)
        } catch (err) {
            console.log(err)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar propostas",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    async get(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaResponse = await PropostaModel.get(id as string)

            if (!propostaResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao buscar proposta",
                    data: null
                }
                return res.status(400).json(response)
            }

            const response: ResponseType<typeof propostaResponse> = {
                status: "success",
                message: "Proposta encontrada com sucesso",
                data: propostaResponse
            }
            return res.status(200).json(response)
        } catch (err) {
            console.log(err)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar proposta",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaData = req.body as propostaDBType
            const propostaResponse = await PropostaModel.update(id as string, propostaData)

            if (!propostaResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao atualizar proposta",
                    data: null
                }
                return res.status(400).json(response)
            }

            const response: ResponseType<typeof propostaResponse> = {
                status: "success",
                message: "Proposta atualizada com sucesso",
                data: propostaResponse
            }
            return res.status(200).json(response)
        } catch (err) {
            console.log(err)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar proposta",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaResponse = await PropostaModel.delete(id as string)

            if (!propostaResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao deletar proposta",
                    data: null
                }
                return res.status(400).json(response)
            }

            const response: ResponseType<typeof propostaResponse> = {
                status: "success",
                message: "Proposta deletada com sucesso",
                data: propostaResponse
            }
            return res.status(200).json(response)
        } catch (err) {
            console.log(err)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao deletar proposta",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    async aceitar(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaData = req.body as propostaDBType
            const propostaResponse = await PropostaModel.update(id as string, { ...propostaData, estado: "aceita" })

            if (!propostaResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao aceitar proposta",
                    data: null
                }
                return res.status(400).json(response)
            }

            const response: ResponseType<typeof propostaResponse> = {
                status: "success",
                message: "Proposta aceita com sucesso",
                data: propostaResponse
            }
            return res.status(200).json(response)
        } catch (err) {
            console.log(err)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao aceitar proposta",
                data: null
            }
            return res.status(500).json(response)
        }
    }
}
