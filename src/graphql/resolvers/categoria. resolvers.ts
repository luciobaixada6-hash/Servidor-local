import { CategoriaModel } from "../../models/categoria.models.js";
import type { categoriaDBType } from "../../utils/type.js";

export const CategoriaResolver ={
    Query: {
        getAllCategoria: async () => {
            return await CategoriaModel.getAll();
        },
        getCategoriaById: async (_: any, args: {id: string}) => {
            return await CategoriaModel.get(args.id);
        }        
    },
    
    Mutation:  {
        createCategoria: async (_:any, args: {id: string, Categoria: categoriaDBType}) => {
            return await CategoriaModel.create(args.Categoria);
        },

        updateCategoria: async (_:any, args: {id: string, Categoria: categoriaDBType}) => {
            return await CategoriaModel.update(args.id, args.Categoria);
        },

        deleteCategoria: async (_:any, args: {id: string}) => {
            return await CategoriaModel.delete(args.id);
        }
}
};