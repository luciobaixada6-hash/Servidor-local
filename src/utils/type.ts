export interface PedidoServicotype {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface Alunostype {
    nome: string;
    endereço: string;
    contato: string | null;
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

export interface serviceDBType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean
}

export interface UserType
{
    id: string, 
    nome: string,
    nome_identifica: string, 
    data_nascimento: string, 
    email: string, 
    telefone: string, 
    pais: string, 
    localidade: string, 
    password: string, 
    enabled: boolean,
    created_at: Date, 
    update_at: Date
}