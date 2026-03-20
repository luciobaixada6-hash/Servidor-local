import { create } from "node:domain";
import db from "./lib/db.js"
import { generateUUID } from "./utils/uuid.js";
import type { UserType } from "./utils/type.js";
import { hashPassword } from "./utils/password.js";
import { formatDateDDMMYYYY } from "./utils/date.js";

export async function getUsers() {
   const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")

   return rows;
}

export async function getUserById(id: string) {
   const [rows] = await db.execute(
      `SELECT * FROM tbl_utilizadores
       WHERE  tbl_utilizadores.id = ?`,
 
      [id]
   )

   console.log(rows)
   if (Array.isArray(rows) && rows.length === 0) return null
   return Array.isArray(rows) ? rows[0] : null
}

// get date now
new Date

export async function createUser(id: string, nome: string, nome_identifica: string, data_nascimento: string, email: string, telefone: string, pais: string, localidade: string, password: string, enabled: boolean, created_at: string, update_at: string) {
   const [rows] = await db.execute(

      `INSERT INTO tbl_utilizadores (id, nome, nome_identifica, data_nascimento, email, telefone, pais, localidade, password, enabled, created_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [generateUUID(), nome, nome_identifica, formatDateDDMMYYYY(data_nascimento), email, telefone, pais, localidade, await hashPassword(password), enabled, new Date(), new Date()]
   )
   return rows;
}

export async function updateUser(id: string, updatedUser: UserType) {
   try {
      const query = `
      UPDATE tbl_servicos
         SET
      nome=?,
         nome_identifica=?,
            data_nascimento=?,
            email=?,
            email=?,
            pais=?,
            localidade=?,
            password=?,
            enabled=?,
            updated_at=?

            WHERE=id
                  `;
      const values = [
         updatedUser.nome,
         updatedUser.nome_identifica,
         updatedUser.data_nascimento,
         updatedUser.email,
         updatedUser.email,
         updatedUser.pais,
         updatedUser.localidade,
         updatedUser.password,
         updatedUser.enabled,
         new Date(),
      ]

      const rows = await db.execute(query, values)
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

   } catch (error) {
      console.log(error);
      return null
   }

}

export async function deleteUser(id: string) {
   try {

      const query = `DELETE FROM tbl_utilizadores WHERE id = ?`

      const values = [id]

      const rows:any = await db.execute(query, values)

      return rows[0]?.affetedRows === 0 ? null : rows 

   } catch (error) {
      console.log(error);
      return null
   }
}
