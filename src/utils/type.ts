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
    idPrestador: string,
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
    precoHora: number,
    profissao: string,
    minimoDesconto: number,
    taxaUrgencia: number,
    percentagemDesconto: number,
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
    subtotal: number,
    horas_estimadas: number,
    id_prestador: string,
    id_servico: string,
    preco_hora: number,
    id_orcamento: string,
    id_utilizador: string,
    urgente: boolean,
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
export enum EstadoProposta {
    PENDENTE = "PENDENTE",
    ACEITE = "ACEITE",
    CANCELADA = "CANCELADA"
}   

export enum EstadoPrestacaoServico {
    PENDENTE = "pendente",
    FINALIZADO = "finalizado",
    EM_PROGRESSO = "em progresso",
    CANCELADA = "cancelada"
}

export interface PrestacaoServicoDetalhadoType {
    id: string,
    nome_utilizador: string,
    email_utilizador: string,
    nome_servico: string,
    descricao: string,
    data_pedido: string,
    urgente: boolean
}

export interface ServicoDetalhadoType {
    id: string,
    nome: string,
    descricao: string,
    designacao_categoria: string,
    icone_categoria: string,    
    id_empresa: string,
    designacao_empresa: string,
    icone_empresa: string,
    enabled: boolean,
    created_at: Date,
    updated_at: Date,
    total_prestacao_servico: number
}

export interface ResponseType<T> {
    status: "success" | "error";
    message: string;
    data: T;
}


