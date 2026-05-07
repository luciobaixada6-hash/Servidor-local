import db from "../lib/db.js"
import type { RowDataPacket } from "mysql2/promise"
import { formatDateDDMMYYYY } from "../utils/date.js"
import { hashPassword } from "../utils/password.js"
import type { UserDBType } from "../utils/type.js"
import { generateUUID } from "../utils/uuid.js"

export const UserModel = {
    async create(User: UserDBType) {
        console.log(User)
        try {
            const query = `INSERT INTO tbl_utilizadores (id, nome, nome_identifica, data_nascimento, email, telefone, pais, localidade, password, role, enabled, created_at, update_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            const values = [
                generateUUID(),
                User.nome,
                User.nome_identifica,
                formatDateDDMMYYYY(User.data_nascimento),
                User.email,
                User.telefone,
                User.pais,
                User.localidade,
                await hashPassword(User.password),
                User.role,
                User.enabled,
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

    async get(id: string): Promise<UserDBType | null> {
        try {
            const query = `SELECT * FROM tbl_utilizadores WHERE id = ?`

            const values = [id]

            const [rows] = await db.execute<UserDBType[] & RowDataPacket[]>(query, values)

            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as UserDBType
            }
            return null

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getById(id: string): Promise<UserDBType | null> {
        try {
            const query = `SELECT * FROM tbl_utilizadores WHERE id = ?`

            const values = [id]

            const [rows] = await db.execute<UserDBType[] & RowDataPacket[]>(query, values)
            console.log(rows)

            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as UserDBType
            }
            return null

        } catch (error) {
            console.error(error);
            return null;
        }
    },



    async getAll() {
        try {
            const query = `SELECT * FROM tbl_utilizadores`

            const [rows] = await db.execute(query);
            return rows;

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getByEmail(email: string): Promise<UserDBType | null> {
        try {
            const [rows] = await db.execute(`SELECT * FROM tbl_utilizadores 
            WHERE email = ?`, [email]);
            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] as UserDBType : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async update(id: string, updatedUser: UserDBType) {
        try {
            const query = `UPDATE tbl_utilizadores SET nome=?, numero_identifica=?, data_nascimento=?, email=?, telefone=?, pais=?, localidade=?, password=?, enabled=?, update_at=? WHERE id=?`
            const values = [
                updatedUser.nome,
                updatedUser.nome_identifica,
                formatDateDDMMYYYY(updatedUser.data_nascimento),
                updatedUser.email,
                updatedUser.telefone,
                updatedUser.pais,
                updatedUser.localidade,
                await hashPassword(updatedUser.password),
                updatedUser.enabled,
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
            const query = `DELETE FROM tbl_utilizadores WHERE id = ?`

            const values = [id];

            const rows: any[] = await db.execute(query, values);

            return rows[0]?.affectedRows === 0 ? null : rows;

        } catch (error) {
            console.error(error);
            return null;
        }
    }
};
