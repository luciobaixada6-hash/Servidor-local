import db from "./lib/db.js";

interface servicotype {
    nome: string;
    precoHora: number;
    categoria: string;
    MinimoDesconto: number;
    percentualDesconto: number;
}
export let catalogoServicos: servicotype[] = [];
// adicionar um Servico novo
export function adicionarServico(novoServico: servicotype) {
    if (!novoServico.nome || novoServico.precoHora <= 0) {
        return "error: nome invalido ou precoHora deve ser maior que zero";
    }


    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === novoServico.nome) {
            return `error: serviço "${novoServico.nome}" já existe no catálogo.`;
        }
    }

    catalogoServicos.push(novoServico);

    return {
        mensagem: "Serviço  adicionado com sucesso!",
        totalServicos: catalogoServicos.length,
        servicosAdicionados: novoServico
    };
}



// listar todos os serviços 
export function listarServicos(): servicotype[] {
    //TODO: implementar a fetch de serviços
    return catalogoServicos;

}

// apagar um serviço 
export function apagarServico(nome: string): boolean {
    //TODO:implementar delete de servico

    const novoCatalogoTemp: servicotype[] = [];

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome && catalogoServicos[i]?.nome !== nome) {

            novoCatalogoTemp.push(catalogoServicos[i]!);
        }
    }
    // devolve um novo catalogo sem o servico que foi apagado

    catalogoServicos = novoCatalogoTemp
    return true;
}

//obter um serviço específico pelo nome
export function obterServico(nome: string): servicotype | null {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            return catalogoServicos[i]!
        }
    }
    return null
}

// função para listar serviços da base de dados
export async function listarServicosBaseDados() {
    try {
        const [rows] = await db.execute(
            "SELECT id, nome, descricao, categoria, enabled, create_at, updated_at FROM table_servicos WHERE enabled = true"
        );

        return {
            status: "success",
            mensagem: "Serviços listados com sucesso.",
            data: rows
        };
    } catch (error) {
        console.error("Erro ao listar serviços:", error);
        return {
            status: "error",
            mensagem: "Erro interno do servidor ao listar serviços.",
            data: null
        };
    }
}

// função para criar serviço na base de dados
export async function criarServicos(
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean
) {
    try {
        const [existingRows] = await db.execute(
            "SELECT id FROM tbl_servicos WHERE nome = ?",
            [nome]
        );

        if ((existingRows as any[]).length > 0) {
            return {
                status: "error",
                mensagem: `Serviço \"${nome}\" já existe na base de dados.`,
                data: null
            };
        }

        const [result] = await db.execute(
            "INSERT INTO tbl_servicos (nome, descricao, categoria, enabled, create_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
            [nome, descricao, categoria, enabled]
        );

        return {
            status: "success",
            mensagem: "Serviço criado com sucesso na base de dados.",
            data: {
                id: (result as any).insertId,
                nome,
                descricao,
                categoria,
                enabled
            }
        };
    } catch (error) {
        console.error("Erro ao criar serviço:", error);
        return {
            status: "error",
            mensagem: "Erro interno do servidor ao criar serviço.",
            data: null
        };
    }
}