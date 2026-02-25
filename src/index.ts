import express from "express";
import { adicionarServico } from "./servico.js";
const app = express();


app.get("/hello", (req, res) => {

    res.send("Hello World");
});

app.post("/adicionar-servico", (req, res) => {
    const novoServico = req.body
    adicionarServico(novoServico)
});

app.listen(8080, () => {
    console.log("servidor rondando na porta 8080")
})