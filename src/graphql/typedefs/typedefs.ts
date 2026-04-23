import {gql} from "graphql-tag"

export const typeDefs = gql`
    enum Role {
        CLIENTE,
        ADMIN, 
        PRESTADOR, 
        EMPRESA
}
    enum EstadoProposta {
        PENDENTE,
        ACEITE,
        CANCELADA
    }
    
    enum EstadoPrestacaoServico {
        PENDENTE,
        FINALIZADO,
        EM_PROGRESSO,
        CANCELADA
        }
    

    enum TipoPrestador {
        PARTICULAR,
        EMPRESA
    }

    type Prestador {
        id: ID,
        nif: String,
        nome: String,
        precoHora: String,
        profissao: String,
        minimoDesconto: String,
        minimoParaDesconto: String,
        taxaUrgencia: String,
        percentagemDesconto: String,
        disponivel: String,
        enabled: String,
        create_at: String,
        updated_at: String
    }

    type Utilizador {
            id: String!,
            nome: String!,
            nome_identifica: String!,
            data_nascimento: String!,
            email: String!,
            telefone: String!,
            pais: String!,
            localidade: String,
            role: Role,
            password: String,
            enabled: Boolean,
            created_at: String,
            update_at: String!
    }

    type Proposta {
        id: String!,
        id_prestacao_servico: String,
        preco_hora: Float,
        horas_estimadas: Float,
        idPrestador: String,
        estado: EstadoProposta,
        owner: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type PrestacaoServico {
            id: String,
            designacao: String
            subtotal: Float,
            horas_estimadas: Int,
            id_prestador: Prestador,
            id_servico: Servico,
            preco_hora: Float,
            id_empresa: Empresa,
            id_orcamento: String,
            id_utilizador: String,
            tipo_prestador: TipoPrestador,
            urgente: Boolean,
            estado: EstadoPrestacaoServico,
            enabled: Boolean,
            created_at: String,
            updated_at: String
    }
    
    type Categoria {
        id: ID,
        designacao: String,
        icone: String,
        created_at: String,
        updated_at: String
        }

    type Empresa {
        id: String,
        designacao: String,
        descricao: String,
        localizacao: String,
        nif: String,
        icone: String,
        id_utilizador: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
        }

        type Servico {
            id: String,
            nome: String,
            descricao: String,
            categoria: String,
            enabled: Boolean
        }

    type Orcamento {
        id: Float,
        total: String,
        id_utilizadores: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Query {
        getAllUsers: [Utilizador],
        getUsersById(id: ID!): Utilizador,

        getAllServico: [Servico],
        getServicoById(id:ID): Servico,

        getAllPrestador: [Prestador],
        getPrestadorById(id:ID): Prestador,

        getAllPrestacaoServico: [PrestacaoServico],
        getPrestacaoServicoById(id:ID): PrestacaoServico,

        getAllProposta: [Proposta],
        getPropostaById(id:ID): Proposta,

        getAllCategoria: [Categoria],
        getCategoriaById(id:ID): Categoria,

        getAllEmpresa: [Empresa],
        getEmpresaById(id:ID!): Empresa,

        getAllOrcamento: [Orcamento],
        getOrcamentoById(id:ID): Orcamento
}
    type Mutation {
        createUser(nome: String!, numero_identificacao: String!, data_nascimento: String!, email: String!, password: String!, telefone: String!, pais: String!, localidade: String!, role: Role!, enabled: Boolean!): Utilizador,
        updateUser(id: ID!, nome: String!, numero_identificacao: String!, data_nascimento: String!, email: String!, password: String!, telefone: String!, pais: String!, localidade: String!, role: Role!, enabled: Boolean!): Utilizador,
        deleteUser(id: ID!): Utilizador,

        createServico(nome: String!, descricao: String!, categoria: String!, enabled: Boolean!): Servico,
        updateServico(id: ID!, nome: String!,descricao: String!, categoria: [ID], enabled: Boolean!): Servico,
        deleteServico(id: ID!): Servico,

        createProposta(id_prestacao_servico: ID!, preco_hora: Float!, horas_estimadas: Int!, idPrestador: ID!, estado: EstadoProposta!, owner: String!,enabled: Boolean!): Proposta,
        updateProposta(id: ID!, id_prestacao_servico: ID!, preco_hora: Float!, horas_estimadas: Int!, idPrestador: ID!, estado: EstadoProposta!, owner: String!,enabled: Boolean!): Proposta,
        deleteProposta(id: ID!): Proposta,

        createPrestador(nif: String!, nome: String!, precoHora: String!, profissao: String!, minimoDesconto: String!, minimoParaDesconto: String!, taxaUrgencia: String!, percentagemDesconto: String!, disponivel: String!, enabled: String!): Prestador,
        updatePrestador(nif: String!, nome: String!, precoHora: String!, profissao: String!, minimoDesconto: String!, minimoParaDesconto: String!, taxaUrgencia: String!, percentagemDesconto: String!, disponivel: String!, enabled: String!): Prestador,
        deletePrestador(id: ID!): Prestador,

        createPrestacaoServico(designacao: String!, subtotal: Float!, horas_estimadas: Int!, id_prestador: ID!, id_servico: ID!, preco_hora: Float!, id_empresa: ID!, id_orcamento: ID!, id_utilizador: ID!, tipo_prestador: TipoPrestador!, urgente: Boolean!, estado: EstadoPrestacaoServico!, enabled: Boolean!): PrestacaoServico,
        updatePrestacaoServico(designacao: String!, subtotal: Float!, horas_estimadas: Int!, id_prestador: ID!, id_servico: ID!, preco_hora: Float!, id_empresa: ID!, id_orcamento: ID!, id_utilizador: ID!, tipo_prestador: TipoPrestador!, urgente: Boolean!, estado: EstadoPrestacaoServico!, enabled: Boolean!): PrestacaoServico,
        deletePrestacaoServico(id: ID!): PrestacaoServico,

        createOrcamento(total: String!, id_utilizadores: String!, enabled: Boolean!): Orcamento,
        updateOrcamento(total: String!, id_utilizadores: String!, enabled: Boolean!): Orcamento,
        deleteOrcamento(id: ID!): Orcamento,

        createEmpresa(designacao: String!, descricao: String!, localizacao: String!, nif: String!, icone: String!, id_utilizador: String!, enabled: Boolean!): Empresa,
        updateEmpresa(designacao: String!, descricao: String!, localizacao: String!, nif: String!, icone: String!, id_utilizador: String!, enabled: Boolean!): Empresa,
        deleteEmpresa(id: ID!): Empresa,

        createCategoria(designacao: String!, icone: String!): Categoria,    
        updateCategoria(designacao: String!, icone: String!): Categoria,
        deleteCategoria(id: ID!): Categoria,
}
`  