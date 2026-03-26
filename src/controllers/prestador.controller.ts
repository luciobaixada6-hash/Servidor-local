import type { Request, Response } from "express"
import type { PrestadorDBType } from "../utils/type.js"
import { PrestadorModel } from "../models/prestador.models.js"

export const PrestadorController = {
    async create(req: Request, res: Response) {
        const prestador: PrestadorDBType = req.body

        if (!prestador) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestador inválidos",
                data: null
            })
        }

        const createPrestadorResponse = await PrestadorModel.create(prestador)

        if (!createPrestadorResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar prestador",
                data: null
            })
        }

        return res.status(201).json({
            status: "success",
            message: "Prestador criado com sucesso",
            data: createPrestadorResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestadoresResponse = await PrestadorModel.getAll()

        if (!getAllPrestadoresResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar prestadores",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestadores buscados com sucesso",
            data: getAllPrestadoresResponse
        })
    },

    async get(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null
            })
        }

        const getPrestadorByIdResponse = await PrestadorModel.get(id as string)

        if (!getPrestadorByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Prestador não encontrado",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestador encontrado com sucesso",
            data: getPrestadorByIdResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedPrestador: PrestadorDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null
            })
        }

        if (!updatedPrestador) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestador inválidos",
                data: null
            })
        }

        const updatePrestadorResponse = await PrestadorModel.update(id as string, updatedPrestador)

        if (!updatePrestadorResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao atualizar prestador",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestador atualizado com sucesso",
            data: updatePrestadorResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null
            })
        }

        const deletePrestadorResponse = await PrestadorModel.delete(id as string)

        if (!deletePrestadorResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao deletar prestador",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestador deletado com sucesso",
            data: null
        })
    }
}
