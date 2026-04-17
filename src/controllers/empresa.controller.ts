import type { Request, Response } from "express"
import type { EmpresaDBType, ResponseType } from "../utils/type.js"
import { EmpresaModel } from "../models/empresa.models.js"

export const EmpresaController = {
    async create(req: Request, res: Response) {
        const empresa: EmpresaDBType = req.body

        if (!empresa) {
            return res.status(400).json({
                status: "error",
                message: "Dados de empresa inválidos",
                data: null
            })
        }

        const createEmpresaResponse = await EmpresaModel.create(empresa)

        if (!createEmpresaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar empresa",
                data: null
            })
        }

        const response: ResponseType<EmpresaDBType> = {
            status: "success",
            message: "Empresa criada com sucesso",
            data: empresa
        }

        return res.status(201).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllEmpresasResponse = await EmpresaModel.getAll()

        if (!getAllEmpresasResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar empresas",
                data: null
            })
        }

        const response: ResponseType<EmpresaDBType[]> = {
            status: "success",
            message: "Empresas buscadas com sucesso",
            data: getAllEmpresasResponse
        }

        return res.status(200).json(response)
    },

    async getById(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null
            })
        }

        const getEmpresaByIdResponse = await EmpresaModel.get(id as string)

        if (!getEmpresaByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Empresa não encontrada",
                data: null
            })
        }

        const response: ResponseType<EmpresaDBType> = {
            status: "success",
            message: "Empresa encontrada com sucesso",
            data: getEmpresaByIdResponse
        }

        return res.status(200).json(response)
    },

    async getByUserId(req: Request, res: Response) {
        const { id_utilizador } = req.params

        if (!id_utilizador) {
            return res.status(400).json({
                status: "error",
                message: "ID do utilizador obrigatório",
                data: null
            })
        }

        const getEmpresasByUserResponse = await EmpresaModel.getByUserId(id_utilizador as string)

        if (!getEmpresasByUserResponse) {
            return res.status(404).json({
                status: "error",
                message: "Nenhuma empresa encontrada para este utilizador",
                data: null
            })
        }

        const response: ResponseType<EmpresaDBType[]> = {
            status: "success",
            message: "Empresas encontradas com sucesso",
            data: getEmpresasByUserResponse
        }

        return res.status(200).json(response)
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        const empresa: EmpresaDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null
            })
        }

        if (!empresa) {
            return res.status(400).json({
                status: "error",
                message: "Dados de empresa inválidos",
                data: null
            })
        }

        const updateEmpresaResponse = await EmpresaModel.update(id as string, empresa)

        if (!updateEmpresaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao atualizar empresa",
                data: null
            })
        }

        const response: ResponseType<EmpresaDBType> = {
            status: "success",
            message: "Empresa atualizada com sucesso",
            data: empresa
        }

        return res.status(200).json(response)
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

        const deleteEmpresaResponse = await EmpresaModel.delete(id as string)

        if (!deleteEmpresaResponse) {
            return res.status(404).json({
                status: "error",
                message: "Empresa não encontrada",
                data: null
            })
        }

        const response: ResponseType<null> = {
            status: "success",
            message: "Empresa removida com sucesso",
            data: null
        }

        return res.status(200).json(response)
    }
}