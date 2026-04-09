import type { RowDataPacket } from "mysql2/promise"
import db from "../lib/db.js"
import type { PrestacaoServicoDetalhadoType,  PrestadorDBType} from "../utils/type.js"
import { generateUUID } from "../utils/uuid.js"


export const PrestadorModel = {
    async create(prestador: PrestadorDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_prestadores 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    prestador.nif,
                    prestador.precoHora,
                    prestador.profissao,
                    prestador.minimoDesconto,
                    prestador.taxaUrgencia,
                    prestador.percentagemDesconto,
                    prestador.profissao,
                    prestador.enabled,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll() {
        const [rows] = await db.execute("SELECT * FROM tbl_prestadores")

        return rows
    },

    async get(id: string): Promise<PrestadorDBType | null> {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_prestadores 
                WHERE tbl_prestadores.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as PrestadorDBType: null 
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, prestador: PrestadorDBType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_prestador 
                SET taxa_urgencia = ?, 
                percentagem_desconto = ?, 
                minimo_desconto = ?, 
                nif = ?, 
                profissao = ?, 
                enable = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    prestador.nif,
                    prestador.precoHora,
                    prestador.profissao,
                    prestador.minimoDesconto,
                    prestador.taxaUrgencia,
                    prestador.percentagemDesconto,
                    prestador.profissao,
                    prestador.enabled,
                    new Date(),
                    id
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                `DELETE FROM tbl_prestadores 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    },


async getAllPrestacaoServicoDetalhado(limit: number, offset: number) {

    try {
        const query =`
            SELECT
            ps.id as id_prestacao_servico,
            ps.designacao as descricao,
            u.nome as nome_utilizador,
            u.email as email_utilizador,
            s.nome as nome_servico,
            ps.create_at as data_pedido,
            ps.urgente
            FROM tbl_prestacao_servicos ps
            INNER JOIN tbl_utilizadores u ON ps.id_utilizador = u.id
            INNER JOIN tbl_servicos s ON ps.id_servico = s.id
            order BY ps.create_at DESC
            LIMIT ? OFFSET ?
            `
        const [rows] = await db.execute<PrestacaoServicoDetalhadoType[] & RowDataPacket[]>(query, [limit.toString(), offset.toString()])

        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows as PrestacaoServicoDetalhadoType[] : null
    } catch (err) {
        console.log(err)
        return null

    }
}
}
