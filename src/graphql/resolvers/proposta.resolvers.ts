import { create } from "node:domain";
import { PropostaModel } from "../../models/proposta.models.js";
import type { propostaDBType } from "../../utils/type.js";


export const PropostaResolver ={
    Query: {
        getAllProposta: async () => {
            return await PropostaModel.getAll();
        },
        getPropostaById: async (_: any, args: {id: string}) => {
            return await PropostaModel.get(args.id);
        }        
    },
    
    Mutation:  {
        createProposta: async (_:any, args: {id: string, proposta: propostaDBType}) => {
            return await PropostaModel.create(args.proposta);
        },

        updateProposta: async (_:any, args: {id: string, proposta: propostaDBType}) => {
            return await PropostaModel.update(args.id, args.proposta);
        },

        deleteProposta: async (_:any, args: {id: string}) => {
            return await PropostaModel.delete(args.id);
        }
}

};
