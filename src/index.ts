import express, { type Request, type Response } from "express";
import { router as serviceRouter } from "./routes/servico.route.js";
import usersRouter from "./routes/users.route.js";




const app = express();

app.use(express.json());

app.use("/api/service", serviceRouter);
app.use("/api", usersRouter);


app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});