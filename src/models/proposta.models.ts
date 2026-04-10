import type { RowDataPacket } from "mysql2/promise"
import db from "../lib/db.js"
import type { propostaDBType } from "../utils/type.js"
import { generateUUID } from "../utils/uuid.js"


export const PropostaModel = {
    async create(proposta: propostaDBType): Promise<propostaDBType | null> {
        try {
            const id = generateUUID()
            const now = new Date()
            
            await db.execute(
                `INSERT INTO tbl_propostas 
                (id, id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    id,
                    proposta.id_prestacao_servico,
                    proposta.preco_hora,
                    proposta.horas_estimadas,
                    proposta.estado,
                    proposta.enabled,
                    now,
                    now
                ]
            )
            
            return {
                id,
                id_prestacao_servico: proposta.id_prestacao_servico,
                preco_hora: proposta.preco_hora,
                horas_estimadas: proposta.horas_estimadas,
                idPrestador: proposta.idPrestador,
                estado: proposta.estado,
                enabled: proposta.enabled,
                created_at: now,
                updated_at: now
            }
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<propostaDBType[] | null> {
        const [rows] = await db.execute<propostaDBType[] & RowDataPacket[]>("SELECT * FROM tbl_propostas")

        return Array.isArray(rows) ? rows as propostaDBType[] : null
    },

    async get(id: string): Promise<propostaDBType | null> {
        try {
            const [rows] = await db.execute<propostaDBType & RowDataPacket[]>(
                `SELECT * FROM tbl_propostas 
                WHERE tbl_propostas.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) && rows.length > 0 ? (rows[0] as propostaDBType) : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, proposta: propostaDBType): Promise<propostaDBType | null> {
        try {
            const now = new Date()
            
            await db.execute(
                `UPDATE tbl_propostas 
                SET id_prestacao_servico = ?, 
                preco_hora = ?, 
                horas_estimadas = ?, 
                idPrestador = ?,
                estado = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    proposta.id_prestacao_servico,
                    proposta.preco_hora,
                    proposta.horas_estimadas,
                    proposta.idPrestador,
                    proposta.estado,
                    proposta.enabled,
                    now,
                    id
                ]
            )
            
            return {
                id,
                id_prestacao_servico: proposta.id_prestacao_servico,
                preco_hora: proposta.preco_hora,
                horas_estimadas: proposta.horas_estimadas,
                idPrestador: proposta.idPrestador,
                estado: proposta.estado,
                enabled: proposta.enabled,
                created_at: proposta.created_at,
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
                `DELETE FROM tbl_propostas 
                WHERE id = ?`,

                [id]
            )

            return result.affectedRows > 0
        } catch (err) {
            console.log(err)
            return null
        }
    },
    
async getByPrestacaoServico(idPrestacaoServico: string): Promise<propostaDBType[] | null> {
    try {
        const [rows] = await db.execute<propostaDBType[] & RowDataPacket[]>(
            `SELECT * FROM tbl_propostas 
            WHERE tbl_propostas.id_prestacao_servico = ?`,

            [idPrestacaoServico]
        )

    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows : null
    } catch (err) {
        console.log(err)
        return null
    }
},

async acceptProposal(id: string): Promise<boolean | null> {
    try {
        const [result]: any = await db.execute(
            `UPDATE tbl_propostas 
            SET estado = 'ACEITE', 
            updated_at = ?
            WHERE id = ?`,
            [
                new Date(),
                id
            ]
        )
        return result.affectedRows > 0
    } catch (err) {
        console.log(err)
        return null
    }
},
}