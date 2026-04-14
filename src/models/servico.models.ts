import { get } from "node:http";
import db from "../lib/db.js";
import type { ServicoDetalhadoType, serviceDBType } from "../utils/type.js"
import { addServicestoDB } from "../servico.js";
import type { RowDataPacket } from "mysql2";

export const serviceModel = {
    async create(newService: serviceDBType): Promise<serviceDBType | null> {
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

            const [result] = await db.execute(query, values) as [any, any]

            if ((result as any).affectedRows > 0) {
                // Get the inserted service
                const insertId = (result as any).insertId
                return await this.get(insertId.toString())
            }
            return null
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<serviceDBType[] | null> {

        try {
            const query = `SELECT * FROM tbl_servicos`

            const [rows] = await db.execute(query) as [RowDataPacket[], any]

            return Array.isArray(rows) && rows.length > 0 ? (rows as serviceDBType[]) : []

        } catch (error) {
            console.log(error);
            return null
        }
    },

    async get(id: string): Promise<serviceDBType | null> {
        try {
            const query = `SELECT * FROM tbl_servicos WHERE id = ?`

            const value = [id]

            const [rows] = await db.execute(query, value) as [RowDataPacket[], any]

            return Array.isArray(rows) && rows.length > 0 ? (rows[0] as serviceDBType) : null

        } catch (error) {
            console.log(error);
            return null
        }
    },

    async update(id: string, servicoAtualizado: serviceDBType): Promise<serviceDBType | null> {
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
            const [result] = await db.execute(query, values) as [any, any]

            if ((result as any).affectedRows > 0) {
                return await this.get(id)
            }
            return null
        } catch (error) {
            console.log(error);
            return null
        }

    },

    async delete(id: string): Promise<boolean> {

        try {

            const query = `DELETE FROM tbl_servicos WHERE id = ?`

            const value = [id]

            const [result] = await db.execute(query, value) as [any, any]

            return (result as any).affectedRows > 0

        } catch (error) {
            console.log(error)
            return false
        }
    },

    async getAllServicoDetalhado(limit: number, offset: number): Promise<ServicoDetalhadoType[] | null> {
        try {
            const query = `
            SELECT DISTINCT
            s.id as id_servico
            s.nome as nome_servico
            s.descricao as descricao_servico
            c.id as id_categoria as id_categoria
            c.designacao as designacao_categoria
            c.icone as icone_categoria
            e.id as id_empresa
            e.designacao as designacao_empresa
            e.icone as icone_empresa
            s.enabled 
            FROM tbl_servicos s
            INNER JOIN tbl_categorias c ON s.categoria = c.id
            INNER JOIN tbl_prestacao_servico ps ON s.id = ps.id_servico
            INNER JOIN tbl_empresas e ON s.id_empresa = e.id
            WHERE s.enabled = true
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