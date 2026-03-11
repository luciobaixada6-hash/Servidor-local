import mysql from "mysql2/promise"

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Labanta2526",
    database: "Servidor_local"
})

export default db