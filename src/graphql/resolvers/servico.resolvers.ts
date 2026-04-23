import { PrestadorModel } from "../../models/prestador.models.js";
import { serviceModel } from "../../models/servico.models.js";
import type { serviceDBType } from "../../utils/type.js";

export const ServicoResolver = {
    Query: {
        getAllServico: async (): Promise<serviceDBType[] | null> => {
            return await serviceModel.getAll();
        },
        getServicoById: async (_: any, args: { id: string }): Promise<serviceDBType | null> => {
            return await serviceModel.get(args.id);
        }
    },

    Mutation: {
        createServico: async (_: any, args: { servico: serviceDBType }): Promise<serviceDBType | null> => {
            return await serviceModel.create(args.servico);
        },

        updateServico: async (_: any, args: { id: string, servico: serviceDBType }): Promise<serviceDBType | null> => {
            return await serviceModel.update(args.id, args.servico);
        },

        deleteServico: async (_: any, args: { id: string }): Promise<boolean> => {
            return await serviceModel.delete(args.id);
        }
    },
            // Relacionamento entre Servico e Categoria
            Servico: {
                Categoria: async (parent: { Categoria: string }) => {
                    return await PrestadorModel.get(parent.Categoria);
                }

}
};