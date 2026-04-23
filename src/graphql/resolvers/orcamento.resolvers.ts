import { OrcamentoModel } from "../../models/orcamento.models.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import type { OrcamentoDBType } from "../../utils/type.js";


export const OrcamentoResolver = {
    Query: {
        getAllOrcamento: async () => {
            return await OrcamentoModel.getAll();
        },
        getOrcamentoById: async (_: any, args: { id: string }) => {
            return await OrcamentoModel.get(args.id);
        }
    },

    Mutation: {
        createOrcamento: async (_: any, args: { id: string, Orcamento: OrcamentoDBType }) => {
            return await OrcamentoModel.create(args.Orcamento);
        },

        updateOrcamento: async (_: any, args: { id: string, Orcamento: OrcamentoDBType }) => {
            return await OrcamentoModel.update(args.id, args.Orcamento);
        },

        deleteOrcamento: async (_: any, args: { id: string }) => {
            return await OrcamentoModel.delete(args.id);
        }
},
        // Relacionamento entre Proposta e Prestador e PrestacaoServico
        Orcamento: {
            utilizadores: async (parent: { id_utilizadores: string }) => {
                return await PrestadorModel.get(parent.id_utilizadores);
            }
        }

};