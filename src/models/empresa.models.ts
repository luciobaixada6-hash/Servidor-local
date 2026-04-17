import db from "../lib/db.js"
import type { RowDataPacket } from "mysql2/promise"
import type { EmpresaDBType } from "../utils/type.js"
import { generateUUID } from "../utils/uuid.js"

export const EmpresaModel = {
    async create(newEmpresa: EmpresaDBType) {
        try {
            const query = `INSERT INTO tbl_empresas (id, designacao, descricao, localizacao, nif, icone, id_utilizador, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            const values = [
                generateUUID(),
                newEmpresa.designacao,
                newEmpresa.descricao,
                newEmpresa.localizacao,
                newEmpresa.nif,
                newEmpresa.icone,
                newEmpresa.id_utilizador,
                newEmpresa.enabled,
                new Date(),
                new Date()
            ]
            const [rows] = await db.execute(query, values)
            return rows
        } catch (error) {
            console.error(error)
            return null;
        }
    },

    async get(id: string): Promise<EmpresaDBType | null> {
        try {
            const query = `SELECT * FROM tbl_empresas WHERE id = ?`

            const values = [id]

            const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(query, values)

            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as EmpresaDBType
            }
            return null

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getAll(): Promise<EmpresaDBType[] | null> {
        try {
            const query = `SELECT * FROM tbl_empresas`

            const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(query)

            if (Array.isArray(rows)) {
                return rows as EmpresaDBType[]
            }
            return null

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getByUserId(id_utilizador: string): Promise<EmpresaDBType[] | null> {
        try {
            const query = `SELECT * FROM tbl_empresas WHERE id_utilizador = ?`

            const values = [id_utilizador]

            const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(query, values)

            if (Array.isArray(rows)) {
                return rows as EmpresaDBType[]
            }
            return null

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async update(id: string, updatedEmpresa: EmpresaDBType) {
        try {
            const query = `UPDATE tbl_empresas SET designacao=?, descricao=?, localizacao=?, nif=?, icone=?, id_utilizador=?, enabled=?, updated_at=? WHERE id=?`
            const values = [
                updatedEmpresa.designacao,
                updatedEmpresa.descricao,
                updatedEmpresa.localizacao,
                updatedEmpresa.nif,
                updatedEmpresa.icone,
                updatedEmpresa.id_utilizador,
                updatedEmpresa.enabled,
                new Date(),
                id
            ]
            const [rows] = await db.execute(query, values)

            return rows;

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tbl_empresas WHERE id = ?`

            const values = [id];

            const rows: any[] = await db.execute(query, values);

            return rows[0]?.affectedRows === 0 ? null : rows;

        } catch (error) {
            console.error(error);
            return null;
        }
    }
};