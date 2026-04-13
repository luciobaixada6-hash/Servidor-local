import { get } from "node:http";
import db from "../lib/db.js";
import { ServicoDetalhadoType, type serviceDBType } from "../utils/type.js"
import { addServicestoDB } from "../servico.js";
import type { RowDataPacket } from "mysql2";

export const serviceModel = {
    async create(newService: serviceDBType) {
        try {

            const query = `INSERT INTO tbl_servicos VALUES (?,?,?,?,?,?,?,)`

            const values = [
                null,
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                new Date(),
                new Date()
            ]

            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll() {

        try {
            const query = `SELECT * FROM tbl_servicos`

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error);
            return null
        }
    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tbl_servicos WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error);
            return null
        }
    },

    async update(id: string, servicoAtualizado: serviceDBType) {
        try {
            const query = `UPDATE tbl_servicos
                    SET
                    nome=?,
                    descricao=?,
                    categoria=?,
                    enabled=?,
                    updated_at=?
                    WHERE
                    id=?
        ;`

            const values = [
                servicoAtualizado.nome,
                servicoAtualizado.descricao,
                servicoAtualizado.categoria,
                servicoAtualizado.enabled,
                new Date(),
                id
            ]
            console.log(values)
            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error);
            return null
        }

    },

    async delete(id: string) {

        try {

            const query = `DELETE FROM tbl_servicos WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return rows

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAllServicoDetalhado(limit: number, offset: number): Promise<ServicoDetalhadoType[] | null> {
        try {
            const query = `
            SELECT 
            s.id,
            s.nome,
            s.descricao,
            c.designacao as designacao_categoria,
            c.icone as icone_categoria,
            e.id as id_empresa,
            designacao as designacao_empresa
            icone as icone_empresa
            s.enabled
            FROM tbl_servicos s
            INNER JOIN tbl_categorias c ON s.categoria = c.id
            INNER JOIN tbl_empresas e ON s.id_empresa = e.id
            LIMIT ? OFFSET ?            
            `
            const values = [limit, offset]
            const [rows] = await db.execute<ServicoDetalhadoType[] & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows as ServicoDetalhadoType[] : null 

        } catch (error) {
            console.log(error)
            return null
        }
}
}