interface servicotype {
    nome: string;
    precoHora: number;
    categoria: string;
    MinimoDesconto: number;
    percentualDesconto: number;
}
let catalogoServicos: servicotype[] = [];

export function adicionarServico(novoServico: servicotype) {
    if (!novoServico.nome || novoServico.precoHora <= 0) {
        return "error: nome invalido ou precoHora deve ser maior que zero";
    }


for (let i = 0; i < catalogoServicos.length; i++) {
    if (catalogoServicos[i]?.nome === novoServico.nome) {
        return  `error: serviço "${novoServico.nome}" já existe no catálogo.`;
}
    }

catalogoServicos.push(novoServico);

return {
     mensagem: "Serviço  adicionado com sucesso!",
totalServicos: catalogoServicos.length,
servicosAdicionados: novoServico
};
}