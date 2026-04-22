import { OrcamentoModel } from "../../models/orcamento.models.js";
import type { OrcamentoDBType } from "../../utils/type.js";


export const OrcamentoResolver ={
    Query: {
        getAllOrcamento: async () => {
            return await OrcamentoModel.getAll();
        },
        getOrcamentoById: async (_: any, args: {id: string}) => {
            return await OrcamentoModel.get(args.id);
        }        
    },
    
    Mutation:  {
        createOrcamento: async (_:any, args: {id: string, Orcamento: OrcamentoDBType}) => {
            return await OrcamentoModel.create(args.Orcamento);
        },

        updateOrcamento: async (_:any, args: {id: string, Orcamento: OrcamentoDBType}) => {
            return await OrcamentoModel.update(args.id, args.Orcamento);
        },

        deleteOrcamento: async (_:any, args: {id: string}) => {
            return await OrcamentoModel.delete(args.id);
        }
}

};