import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../utils/date.js"
import { hashPassword } from "../utils/password.js"
import type {  UserDBType} from "../utils/type.js"
import { generateUUID } from "../utils/uuid.js"

export const UserModel = {
    async create(newUser: UserDBType) {
        try {
            const query = `INSERT INTO tbl_utilizadores (id, nome, nome_identifica, data_nascimento, email, telefone, pais, localidade, password, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            const values = [
                generateUUID(),
                newUser.nome,
                newUser.nome_identifica,
                formatDateDDMMYYYY(newUser.data_nascimento),
                newUser.email,
                await hashPassword(newUser.password),
                newUser.telefone,
                newUser.pais,
                newUser.localidade,
                newUser.enabled,
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

    async get(id: string) {
        try {
            const query = `SELECT * FROM tbl_utilizadores WHERE id = ?`

            const values = [id]

            const rows = await db.execute(query, values);
            return Array.isArray(rows) && rows.length > 0 ? rows[0]: null;


        } catch (error) {
            console.error(error);
            return null;
        }
    },
    async getAll() {
        try {
            const query = `SELECT * FROM tbl_utilizadores`

            const rows = await db.execute(query);
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

    async update (id: string, updatedUser: UserDBType) {
        try {
            const query = `UPDATE tbl_utilizadores SET nome=?, nome_identifica=?, data_nascimento=?, email=?, telefone=?, pais=?, localidade=?, password=?, enabled=?, updated_at=? WHERE id=?`
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
