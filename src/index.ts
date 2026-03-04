import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico, listarServicos, obterServico } from "./servico.js";
import { calcularOrcamento, criarPrestadorDeServico, selecionarPrestadoresServicos, selecionarServicos } from "./orcamento.js";
import { apagarPrestadorDeServico } from "./orcamento.js";
import { editarPrestadorDeServico } from "./orcamento.js";
const app = express();

app.use(express.json());


app.get("/hello", (req: Request, res: Response) => {

    res.send("Hello World");
});
// Rota para adicionar um servico novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body

    console.log(novoServico)

    const addServicoResponse = adicionarServico(novoServico)

    res.json(addServicoResponse)
});

// Rota para listar todos os serviços
app.get("/listar-servicos", (req: Request, res: Response) => {
    const ListarServicosResponse = listarServicos();

    res.json(ListarServicosResponse);
});

// Rota para apagar um servico

app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query;

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string)

        res.json(apagarServicoResponse);
    } else {
        res.json({
            mensagem: "Nome do serviço é obrigatório."
        })
    }
})

// Rota para obter um serviço pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query;

    if (nome) {
        const obterServicoResponse = obterServico(nome as string)

        res.json(obterServicoResponse)
    } else {
        res.json({
            mensagem: "Nome do serviço é obrigatório."
        })
    }
})

// rota para selecionar servidor
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body

    const selecionarServicoResponse = selecionarServicos(nome as string)

    res.json({
        selecionarServicoResponse

    })
})

// rota para selecionar prestador de serviço
app.post("/selecionar-prestador-de-servico", (req: Request, res: Response) => {
    const { nomeDoPrestador } = req.body
    const selecionarPrestadorDeServicoResponse = selecionarPrestadoresServicos(nomeDoPrestador as string)
    res.json({
        status:selecionarPrestadorDeServicoResponse,
        message: "Prestador de serviço selecionado com sucesso."
    })
})

// rota para criar um prestador de serviço
app.post("/criar-prestador-de-servico", (req: Request, res: Response) => {
    const novoPrestador = req.body
    const criarPrestadorDeServicoResponse = criarPrestadorDeServico(novoPrestador)
    res.json(criarPrestadorDeServicoResponse)
})

// rota para editar um prestador de serviço
app.put("/editar-prestador-de-servico", (req: Request, res: Response) => {
    const { nomeDoPrestador } = req.query
    const novosDadosDoPrestador = req.body
    const editarPrestadorDeServicoResponse = editarPrestadorDeServico(nomeDoPrestador as string, novosDadosDoPrestador)
    res.json(editarPrestadorDeServicoResponse)
})           

// rota para apagar um prestador de serviço
app.delete("/apagar-prestador-de-servico", (req: Request, res: Response) => {
    const { nomeDoPrestador } = req.query 
    const apagarPrestadorDeServicoResponse = apagarPrestadorDeServico(nomeDoPrestador as string)
    res.json(apagarPrestadorDeServicoResponse)
})



// rota para calcular orçamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body
    const calcularOrcamentoResponse = calcularOrcamento(pedido)

    res.json({
        message: "Orçamento calculado com sucesso",
        orcamentoTotal: calcularOrcamentoResponse
    })
})

app.listen(8080, () => {
    console.log("servidor rondando na porta 8080")
})