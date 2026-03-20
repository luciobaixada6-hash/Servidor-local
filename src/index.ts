import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico, listarServicos, obterServico, listarServicosBaseDados, criarServicos, updateService, addServicestoDB, getServiceById, getALLService, deleteService } from "./servico.js";
import { calcularOrcamento, criarPrestadorDeServico, selecionarPrestadoresServicos, selecionarServicos } from "./orcamento.js";
import { apagarPrestadorDeServico } from "./orcamento.js";
import { editarPrestadorDeServico } from "./orcamento.js";
import { createUser, getUserById, getUsers } from "./users.js";
import { stat } from "node:fs";
import type { serviceDBType, servicotype } from "./utils/type.js";
import { create } from "node:domain";
import { generateUUID } from "./utils/uuid.js";
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
        status: selecionarPrestadorDeServicoResponse,
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

// selecionar todos os utilizadores presentes na base de dados
app.get("/get-users", async (req: Request, res: Response) => {
    const getUsersResponse = await getUsers()
    res.json(getUsersResponse);
})

// rota para obter um utilizador pelo id
app.get("/get-user-by-id", async (req: Request, res: Response) => {
    const { id } = req.query
    if (id) {
        const getUserByIdResponse = await getUserById(id as string)

        if (!getUserByIdResponse) {


            res.status(404).json({
                status: "error",
                message: "ID do utilizador é obrigatório.",
                data: null
            })
        }


        res.status(200).json({
            status: "success",
            message: "utilizador encontrado",
            data: getUserByIdResponse

        })
    }
})
// rota para criar um utilizador
app.post("/create-user", async (req: Request, res: Response) => {
    const { id, nome, nome_identifica, data_nascimento, email, telefone, pais, localidade, password, enabled, created_at, update_at } = req.body
    const createUserResponse = await createUser(id, nome, nome_identifica, data_nascimento, email, telefone, pais, localidade, password, enabled, created_at, update_at)
    res.json(createUserResponse)
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

// criar servico base dados
app.post("/criar-servico", async (req: Request, res: Response) => {
    const servico = req.body;
    if (!servico) {
        return res.status(400).json({
            status: "error",
            mensagem: "Campos obrigatórios em falta",
            data: null
        });
    }

    console.log("Dados recebidos:", servico);

    const insertServicoResponse = await criarServicos(
        servico.id,
        servico.nome,
        servico.descricao,
        servico.categoria,
        servico.enabled
    );
    res.json(insertServicoResponse);
})



// lista de serviços para base dados
app.get("/listar-servicos-base-dados", async (req: Request, res: Response) => {
    const listarServicosResponse = await listarServicosBaseDados()
    res.json(listarServicosResponse)
})


app.post("/create-service", async (req: Request, res: Response) => {
    const newService: serviceDBType = req.body;

    if (!newService) {
        return res.status(400).json({
            status: "error",
            message: "Dados de servico invalidos",
            data: null,
        })
    }

    console.log(newService);

    const createServiceResponse = await addServicestoDB(newService);

    if (!createServiceResponse === null) {
        return res.status(400).json({
            status: "error",
            message: "error ao criar servico",
            data: null,
        }
        )
    }

    res.status(200).json({
        status: "sucess",
        message: "servico criado com sucesso",
        data: createServiceResponse,
    })
})

app.get("/get-service-by-id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            status: "error",
            message: "ID obrigatorio",
            data: null,
        })
    }

    const getServiceByIdResponse = await getServiceById(id as string);

    if (!getServiceByIdResponse) {
        res.status(400).json({
            status: "error",
            message: "servico não encontrado",
            data: null,
        })
    }

    res.status(400).json({
        status: "sucess",
        message: "servico encontrado com sucesso",
        data: getServiceByIdResponse,
    })

})

app.get("/get-all-services", async (require: Request, res: Response) => {
    const getALLServiceResponse = await getALLService();

    if (!getALLServiceResponse) {
        return res.status(400).json({
            status: "error",
            message: "erro ao selecionar servicos",
            data: null,
        })
    }
    res.status(200).json({
        stutas: "sucess",
        message: "servico encontrado",
        data: getALLServiceResponse
    });

})



app.put("/update-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatService: serviceDBType = req.body

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: " error ao atualizar servico",
            data: null
        })
    }

    const updateServiceResponse = await updateService(id as string, updatService)

    return res.status(200).json({
        status: "sucess",
        message: "servico atualizado com sucesso",
        data: updateServiceResponse
    })
})

app.delete("/delete-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params;


    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID obrigatório",
            data: null
        });
    }

    const deleteServiceResponse = await deleteService(id as string)

    if (!deleteServiceResponse) {
        return res.status(400).json({
            status: "error",
            message: " error ao apagar servico",
            data: null
        })
    }

    return res.status(200).json({
        status: "sucess",
        message: "servico apagado com sucesso",
        data: deleteServiceResponse
    })
})

const dataUmformatted = new Date("10-10-1997")



app.listen(8080, () => {
    console.log("servidor rondando na porta 8080")
})