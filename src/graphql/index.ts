import { typeDefs } from "./typedefs/typedefs.js";
import { UsersResolver } from "./resolvers/users.resolver.js";
import { PrestadorResolver } from "./resolvers/prestador.resolvers.js";
import { PrestacaoServicoResolver } from "./resolvers/prestacao-servico.resolvers.js";
import { PropostaResolver } from "./resolvers/proposta.resolvers.js";
import { CategoriaResolver } from "./resolvers/categoria. resolvers.js";
import { EmpresaResolver } from "./resolvers/empresa.resolvers.js";
import { OrcamentoResolver } from "./resolvers/orcamento.resolvers.js";
import { ServicoResolver } from "./resolvers/servico.resolvers.js";

export const resolvers = {
    Query: {
        ...UsersResolver.Query,
        ...PrestadorResolver.Query,
        ...PrestacaoServicoResolver.Query,
        ...PropostaResolver.Query,
        ...CategoriaResolver.Query,
        ...EmpresaResolver.Query,
        ...OrcamentoResolver.Query,
        ...ServicoResolver.Query
    },
    Mutation: {
        ...UsersResolver.Mutation,
        ...PrestadorResolver.Mutation,
        ...PrestacaoServicoResolver.Mutation,
        ...PropostaResolver.Mutation,
        ...CategoriaResolver.Mutation,
        ...EmpresaResolver.Mutation,
        ...OrcamentoResolver.Mutation,
        ...ServicoResolver.Mutation
    }
}

export { typeDefs }