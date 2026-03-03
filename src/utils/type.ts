export interface PedidoServicotype {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface Alunostype {
    nome:string;
    endereço:string;
    contato:string | null;
}



export interface servicotype {
    nome: string;
    precoHora: number;
    categoria: string;
    MinimoDesconto: number;
    percentualDesconto: number;
}

export interface PrestadorType {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number
}

export interface PrestadorType {
    nome: string
    id: number
}