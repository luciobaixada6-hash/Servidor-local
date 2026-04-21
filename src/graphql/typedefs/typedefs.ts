import {gql} from "graphql-tag"

export const typeDefs = gql`
    type utilizador {
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

    enum Role {
        CLIENTE = "cliente",
        ADMIN = "admin",
        PRESTADOR = "prestador",
        EMPRESA = "empresa"
}
    type proposta {
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

    enum EstadoProposta {
        PENDENTE = "PENDENTE",
        ACEITE = "ACEITE",
        CANCELADA = "CANCELADA"
    }
    
    type service {
        id: string,
        nome: string,
        descricao: string,
        categoria: string,
        enabled: boolean
        }
    

`

    