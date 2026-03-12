import { create } from "node:domain";
import db from "./lib/db.js"

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
   [id, nome, nome_identifica, data_nascimento, email, telefone, pais, localidade, password, enabled, created_at, update_at]
   )
   return rows;}