import { create } from "node:domain";
import { PropostaModel } from "../../models/proposta.models.js";
import type { propostaDBType } from "../../utils/type.js";


export const propostaResolver ={
    Query: {
        getAllpropostas: async () => {
            return await PropostaModel.getAll();
        },
        getpropostaById: async (_: any, args: {id: string}) => {
            return await PropostaModel.get(args.id);
        }        
    },
    
    Mutation:  {
        createproposta: async (_:any, args: {id: string, proposta: propostaDBType}) => {
            return await PropostaModel.create(args.proposta);
        },

        updateproposta: async (_:any, args: {id: string, proposta: propostaDBType}) => {
            return await PropostaModel.update(args.id, args.proposta);
        },

        deleteproposta: async (_:any, args: {id: string}) => {
            return await PropostaModel.delete(args.id);
        }
}

};
