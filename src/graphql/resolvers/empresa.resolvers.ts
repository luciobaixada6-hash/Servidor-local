import { EmpresaModel } from "../../models/empresa.models.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import type { EmpresaDBType } from "../../utils/type.js";


export const EmpresaResolver ={
    Query: {
        getAllEmpresa: async () => {
            return await EmpresaModel.getAll();
        },
        getEmpresaById: async (_: any, args: {id: string}) => {
            return await EmpresaModel.get(args.id);
        }        
    },
    
    Mutation:  {
        createEmpresa: async (_:any, args: {id: string, Empresa: EmpresaDBType}) => {
            return await EmpresaModel.create(args.Empresa);
        },

        updateEmpresa: async (_:any, args: {id: string, Empresa: EmpresaDBType}) => {
            return await EmpresaModel.update(args.id, args.Empresa);
        },

        deleteEmpresa: async (_:any, args: {id: string}) => {
            return await EmpresaModel.delete(args.id);
        }
},

        // Relacionamento entre Proposta e Prestador e PrestacaoServico
        Empresa: {
            utilizadores: async (parent: { id_utilizadores: string }) => {
                return await PrestadorModel.get(parent.id_utilizadores);
            }
}
};