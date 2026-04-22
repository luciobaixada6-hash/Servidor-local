
import { PrestacaoServicoModel } from "../../models/prestacao-servico..models.js";
import type { prestacaoServicoDBType } from "../../utils/type.js";


export const PrestacaoServicoResolver ={
    Query: {
        getAllPrestacaoServico: async () => {
            return await PrestacaoServicoModel.getAll();
        },
        getPrestacaoServicoById: async (_: any, args: {id: string}) => {
            return await PrestacaoServicoModel.get(args.id);
        }        
    },
    
    Mutation:  {
        createPrestacaoServico: async (_:any, args: {id: string, PrestacaoServico: prestacaoServicoDBType}) => {
            return await PrestacaoServicoModel.create(args.PrestacaoServico);
        },

        updatePrestacaoServico: async (_:any, args: {id: string, PrestacaoServico: prestacaoServicoDBType}) => {
            return await PrestacaoServicoModel.update(args.id, args.PrestacaoServico);
        },

        deletePrestacaoServico: async (_:any, args: {id: string}) => {
            return await PrestacaoServicoModel.delete(args.id);
        }
}

};