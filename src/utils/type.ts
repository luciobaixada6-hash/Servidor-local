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

export interface PrestadorDBType {
    id: string,
    nif: string,
    precoHora: string,
    profissao: string,
    minimoDesconto: string,
    taxaUrgencia: string,
    percentagemDesconto: string,
    disponivel: string,
    enabled: string,
    create_at: Date,
    updated_at: Date
}

export interface serviceDBType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean
}

export interface propostaDBType {
    id: string,
    id_prestacao_servico: string,
    preco_hora: number,
    horas_estimadas: number,
    estado: string,
    enabled: boolean,
    created_at: Date,
    updated_at: Date
    ,
}


export interface UserDBType {
    id: string,
    nome: string,
    numero_identifica: string,
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

export interface OrcamentoType {
    id: number,
    total: string,
    id_utilizadores: string,
    enabled: boolean,
    created_at: Date,
    updated_at: Date
}

export interface PropostaDBType {
    id: string,
    nif: string,
    precoHora: string,
    profissao: string,
    minimoDesconto: string,
    taxaUrgencia: string,
    percentagemDesconto: string,
    enabled: boolean,
    create_at: Date,
    update_at: Date
}

export interface OrcamentoDBType {
    id: number,
    total: string,
    id_utilizadores: string,
    enabled: boolean,
    created_at: Date,
    updated_at: Date
}


export interface processoType {
    id: string;
    titulo: string;
    descricao: string;
    estado: string;
    id_utilizador: string;
    id_prestador?: string;
    id_servico: number;
    id_orcamento?: number;
    data_inicio: Date;
    data_fim?: Date;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}
export interface prestacaoServicoDBType {
    id: string,
    designacao: string
    id_orcamento: string,
    subtotal: number,
    horas_estimadas: number,
    id_prestador: string,
    id_servico: string,
    preco_hora: number,
    estado: string,
    enabled: boolean,
    created_at: Date,
    updated_at: Date
}

export interface prestadorType {
    id: string,
    taxaUrgencia: number,
    nome: string,
    precoHora: number,
    profissao: string,
    minimoDesconto: number,
    percentagemDesconto: number,
    disponivel: boolean
}

