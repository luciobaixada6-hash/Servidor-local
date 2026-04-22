import type { RowDataPacket } from "mysql2/promise"
import db from "../lib/db.js"
import type { PrestacaoServicoDetalhadoType,  PrestadorDBType, prestadorType, propostaDBType} from "../utils/type.js"
import { generateUUID } from "../utils/uuid.js"


export const PrestadorModel = {
    async create(prestador: PrestadorDBType): Promise<PrestadorDBType | null> {
        try {
            const id = generateUUID()
            const now = new Date()
            
            await db.execute(
                `INSERT INTO tbl_prestadores 
                (id, nif, nome, precoHora, profissao, minimoDesconto, minimoParaDesconto, taxaUrgencia, percentagemDesconto, disponivel, enabled, create_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    id,
                    prestador.nif,
                    prestador.nome,
                    prestador.precoHora,
                    prestador.profissao,
                    prestador.minimoDesconto,
                    prestador.minimoParaDesconto,
                    prestador.taxaUrgencia,
                    prestador.percentagemDesconto,
                    prestador.disponivel,
                    prestador.enabled,
                    now,
                    now
                ]
            )

            return { ...prestador, id, create_at: now, updated_at: now }

        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<PrestadorDBType[] | null> {
        const [rows] = await db.execute<PrestadorDBType[] & RowDataPacket[]>("SELECT * FROM tbl_prestadores")

        return Array.isArray(rows) ? rows as PrestadorDBType[] : null
    },

    async get(id: string): Promise<PrestadorDBType | null> {
        try {
            const [rows] = await db.execute<PrestadorDBType & RowDataPacket[]>(
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

    async update(id: string, prestador: PrestadorDBType): Promise<PrestadorDBType | null> {
        try {
            const now = new Date()
            
            await db.execute(
                `UPDATE tbl_prestadores 
                SET nif = ?, 
                nome = ?,
                precoHora = ?, 
                profissao = ?, 
                minimoDesconto = ?, 
                minimoParaDesconto = ?,
                taxaUrgencia = ?, 
                percentagemDesconto = ?, 
                disponivel = ?,
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    prestador.nif,
                    prestador.nome,
                    prestador.precoHora,
                    prestador.profissao,
                    prestador.minimoDesconto,
                    prestador.minimoParaDesconto,
                    prestador.taxaUrgencia,
                    prestador.percentagemDesconto,
                    prestador.disponivel,
                    prestador.enabled,
                    now,
                    id
                ]
            )

            return { ...prestador, id, updated_at: now }
        } catch (err) {
            console.log(err)
            return null 
        }
    },

    async delete(id: string): Promise<boolean | null> {
        try {
            const [result]: any = await db.execute(
                `DELETE FROM tbl_prestadores 
                WHERE id = ?`,

                [id]
            )

            return result.affectedRows > 0
        } catch (err) {
            console.log(err)
            return null
        }
    },



}
