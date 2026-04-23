
import { PrestacaoServicoModel } from "../../models/prestacao-servico..models.js";
import { PrestadorModel } from "../../models/prestador.models.js";
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
},

// Relacionamento entre orcamento, Prestador, utilizador, Empresa e Servico
PrestacaoServico: {
    prestador: async (parent: {id_prestador: string}) => {
        return await PrestadorModel.get(parent.id_prestador);
    },
    servico: async (parent: {id_servico: string}) => {
        return await PrestacaoServicoModel.get(parent.id_servico);
    },
    orcamento: async (parent: {id_orcamento: string}) => {
        return await PrestacaoServicoModel.get(parent.id_orcamento);
    },
    Empresa: async (parent: {id_empresa: string}) => {
        return await PrestacaoServicoModel.get(parent.id_empresa);
    },
    utilizador: async (parent: {id_utilizador: string}) => {
        return await PrestacaoServicoModel.get(parent.id_utilizador);
    }
}

};