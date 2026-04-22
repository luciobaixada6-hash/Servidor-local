import { PrestadorModel } from "../../models/prestador.models.js";
import type { PrestadorDBType } from "../../utils/type.js";

export const PrestadorResolver ={
    Query: {
        getAllPrestadors: async () => {
            return await PrestadorModel.getAll();
        },
        getPrestadorById: async (_: any, args: {id: string}) => {
            return await PrestadorModel.get(args.id);
        }        
    },
    
    Mutation:  {
        createPrestador: async (_:any, args: {id: string, Prestador: PrestadorDBType}) => {
            return await PrestadorModel.create(args.Prestador);
        },

        updatePrestador: async (_:any, args: {id: string, Prestador: PrestadorDBType}) => {
            return await PrestadorModel.update(args.id, args.Prestador);
        },

        deletePrestador: async (_:any, args: {id: string}) => {
            return await PrestadorModel.delete(args.id);
        }
}

};

