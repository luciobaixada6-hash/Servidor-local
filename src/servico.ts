import { allowedNodeEnvironmentFlags } from "node:process";

interface servicotype {
    nome: string;
    precoHora: number;
    categoria: string;
    MinimoDesconto: number;
    percentualDesconto: number;
}
let catalogoServicos: servicotype[] = [];
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

    const novoCatalogoTemp : servicotype[] = [];

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