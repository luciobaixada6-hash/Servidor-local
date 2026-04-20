import type { Request, Response } from "express"
import type { categoriaDBType, ResponseType } from "../utils/type.js"
import { CategoriaModel } from "../models/categoria.models.js"

export const CategoriaController = {
    async create(req: Request, res: Response) {
        const categoria: categoriaDBType = req.body

        if (!categoria) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de categoria inválidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const createCategoriaResponse: categoriaDBType | null = await CategoriaModel.create(categoria)

        if (!createCategoriaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar categoria",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<categoriaDBType> = {
            status: "success",
            message: "Categoria criada com sucesso",
            data: createCategoriaResponse
        }
        return res.status(201).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllCategoriasResponse: categoriaDBType[] | null = await CategoriaModel.getAll()

        if (!getAllCategoriasResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar categorias",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<categoriaDBType[]> = {
            status: "success",
            message: "Categorias buscadas com sucesso",
            data: getAllCategoriasResponse
        }
        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatório",
                data: null
            }
            return res.status(400).json(response)
        }

        const getCategoriaByIdResponse = await CategoriaModel.get(id as string)

        if (!getCategoriaByIdResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Categoria não encontrada",
                data: null
            }
            return res.status(404).json(response)
        }

        return res.status(200).json({
            status: "success",
            message: "Categoria encontrada com sucesso",
            data: getCategoriaByIdResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedCategoria: categoriaDBType = req.body

        if (!id) {
            const response: ResponseType<null> = {  
                status: "error",
                message: "ID obrigatório",
                data: null
            }
            return res.status(400).json(response)
        }

        if (!updatedCategoria) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de categoria inválidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updateCategoriaResponse = await CategoriaModel.update(id as string, updatedCategoria)

        if (!updateCategoriaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao atualizar categoria",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Categoria atualizada com sucesso",
            data: updateCategoriaResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatório",
                data: null
            }
            return res.status(400).json(response)
        }

        const deleteCategoriaResponse = await CategoriaModel.delete(id as string)

        if (!deleteCategoriaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao deletar categoria",
                data: null
            }
            return res.status(500).json(response)
        }

        return res.status(200).json({
            status: "success",
            message: "Categoria deletada com sucesso",
            data: null
        })
    }
}  