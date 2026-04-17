import type { RowDataPacket } from "mysql2/promise"
import db from "../lib/db.js"
import type { categoriaDBType } from "../utils/type.js"
import { generateUUID } from "../utils/uuid.js"

export const CategoriaModel = {
    async create(categoria: categoriaDBType): Promise<categoriaDBType | null> {
        try {
            const id = generateUUID()
            const now = new Date()

            await db.execute(
                `INSERT INTO tbl_categorias
                (id, designacao, icone, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?)`,

                [
                    id,
                    categoria.designacao,
                    categoria.icone,
                    now,
                    now
                ]
            )

            return {
                id,
                designacao: categoria.designacao,
                icone: categoria.icone,
                created_at: now,
                updated_at: now
            }
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<categoriaDBType[] | null> {
        const [rows] = await db.execute<categoriaDBType[] & RowDataPacket[]>("SELECT * FROM tbl_categorias")

        return Array.isArray(rows) ? rows as categoriaDBType[] : null
    },

    async get(id: string): Promise<categoriaDBType | null> {
        try {
            const [rows] = await db.execute<categoriaDBType & RowDataPacket[]>(
                `SELECT * FROM tbl_categorias
                WHERE tbl_categorias.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as categoriaDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, categoria: categoriaDBType): Promise<categoriaDBType | null> {
        try {
            const now = new Date()

            await db.execute(
                `UPDATE tbl_categorias
                SET designacao = ?,
                icone = ?,
                updated_at = ?
                WHERE id = ?`,

                [
                    categoria.designacao,
                    categoria.icone,
                    now,
                    id
                ]
            )

            return {
                id,
                designacao: categoria.designacao,
                icone: categoria.icone,
                created_at: categoria.created_at,
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
                `DELETE FROM tbl_categorias
                WHERE id = ?`,

                [id]
            )

            return result.affectedRows > 0
        } catch (err) {
            console.log(err)
            return null
        }
    }
}