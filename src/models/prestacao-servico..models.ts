import type { RowDataPacket } from "mysql2/promise"
import db from "../lib/db.js"
import type { prestacaoServicoDBType, PrestacaoServicoDetalhadoType } from "../utils/type.js"
import { generateUUID } from "../utils/uuid.js"


export const PrestacaoServicoModel = {
    async create(prestacaoServico: prestacaoServicoDBType): Promise<prestacaoServicoDBType | null> {
        try {
            const id = generateUUID()
            const now = new Date()
            
            await db.execute(
                `INSERT INTO tbl_prestacao_servico 
                (id, designacao, subtotal, horas_estimadas, id_prestador, id_servico, preco_hora, estado, id_orcamento, id_utilizador, urgente, enabled, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    id,
                    prestacaoServico.designacao,
                    prestacaoServico.subtotal,
                    prestacaoServico.horas_estimadas,
                    prestacaoServico.id_prestador,
                    prestacaoServico.id_servico,
                    prestacaoServico.preco_hora,
                    prestacaoServico.estado,
                    prestacaoServico.id_orcamento,
                    prestacaoServico.id_utilizador,
                    prestacaoServico.urgente,
                    prestacaoServico.enabled,
                    now,
                    now
                ]
            )
            
            return {
                id,
                designacao: prestacaoServico.designacao,
                subtotal: prestacaoServico.subtotal,
                horas_estimadas: prestacaoServico.horas_estimadas,
                id_prestador: prestacaoServico.id_prestador,
                id_servico: prestacaoServico.id_servico,
                preco_hora: prestacaoServico.preco_hora,
                id_empresa: prestacaoServico.id_empresa,
                id_orcamento: prestacaoServico.id_orcamento,
                id_utilizador: prestacaoServico.id_utilizador,
                tipo_prestador: prestacaoServico.tipo_prestador,
                estado: prestacaoServico.estado,
                urgente: prestacaoServico.urgente,
                enabled: prestacaoServico.enabled,
                created_at: now,
                updated_at: now
            }
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<prestacaoServicoDBType[] | null> {
        const [rows] = await db.execute<prestacaoServicoDBType[] & RowDataPacket[]>("SELECT * FROM tbl_prestacao_servico")

        return Array.isArray(rows) ? rows as prestacaoServicoDBType[] : null
    },

    async get(id: string): Promise<prestacaoServicoDBType | null> {
        try {
            const [rows] = await db.execute<prestacaoServicoDBType & RowDataPacket[]>(
                `SELECT * FROM tbl_prestacao_servico 
                WHERE tbl_prestacao_servico.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) && rows.length > 0 ? (rows[0] as prestacaoServicoDBType) : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, prestacaoServico: prestacaoServicoDBType): Promise<prestacaoServicoDBType | null> {
        try {
            const now = new Date()
            
            await db.execute(
                `UPDATE tbl_prestacao_servico 
                SET designacao = ?, 
                subtotal = ?, 
                horas_estimadas = ?, 
                id_prestador = ?, 
                id_servico = ?, 
                preco_hora = ?, 
                estado = ?, 
                id_orcamento = ?, 
                id_utilizador = ?,
                urgente = ?,
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    prestacaoServico.designacao,
                    prestacaoServico.subtotal,
                    prestacaoServico.horas_estimadas,
                    prestacaoServico.id_prestador,
                    prestacaoServico.id_servico,
                    prestacaoServico.preco_hora,
                    prestacaoServico.estado,
                    prestacaoServico.id_orcamento,
                    prestacaoServico.id_utilizador,
                    prestacaoServico.urgente,
                    prestacaoServico.enabled,
                    now,
                    id
                ]
            )
            
            return{
                id,
                designacao: prestacaoServico.designacao,
                subtotal: prestacaoServico.subtotal,
                horas_estimadas: prestacaoServico.horas_estimadas,
                id_prestador: prestacaoServico.id_prestador,
                id_servico: prestacaoServico.id_servico,
                preco_hora: prestacaoServico.preco_hora,
                id_empresa: prestacaoServico.id_empresa,
                id_orcamento: prestacaoServico.id_orcamento,
                id_utilizador: prestacaoServico.id_utilizador,
                tipo_prestador: prestacaoServico.tipo_prestador,
                estado: prestacaoServico.estado,
                urgente: prestacaoServico.urgente,
                enabled: prestacaoServico.enabled,
                created_at: prestacaoServico.created_at,
                updated_at: now
            }
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string): Promise<boolean | null> {
        try {
            const [result]: any = await db.execute(
                `DELETE FROM tbl_prestacao_servico 
                WHERE id = ?`,

                [id]
            )

            return result.affectedRows > 0
        } catch (err) {
            console.log(err)
            return null
        }
    },


async getByIdOrcamento(idOrcamento: string): Promise<prestacaoServicoDBType | null> {
    try {
        const [rows] = await db.execute<prestacaoServicoDBType[] & RowDataPacket[]>(
            `SELECT * FROM tbl_prestacao_servico 
            WHERE tbl_prestacao_servico.id_orcamento = ?`,

            [idOrcamento]
        )

        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows[0] as prestacaoServicoDBType : null
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
},

    async getAllPrestacaoServicoByCategoria(categoria: string) {
        try {
            const query = `
                SELECT DISTINCT
                ps.id as id_prestacao_servico,
                ps.designacao as descricao,
                u.nome as nome_utilizador,
                u.email as email_utilizador,
                s.nome as nome_servico,
                s.categoria as categoria,
                ps.preco_hora,
                ps.horas_estimadas,
                ps.subtotal,
                ps.estado,
                ps.created_at as data_criacao
                FROM tbl_prestacao_servico ps
                INNER JOIN tbl_utilizadores u ON ps.id_utilizador = u.id
                INNER JOIN tbl_servicos s ON ps.id_servico = s.id
                WHERE s.categoria = ?
                ORDER BY ps.created_at DESC
            `
            const [rows] = await db.execute<any[] & RowDataPacket[]>(query, [categoria])

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows : null
        } catch (err) {
            console.log(err)
            return null
        }
    }
}


