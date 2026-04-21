import { create } from "node:domain";
import { UserModel } from "../../models/users.models.js";
import type { UserDBType } from "../../utils/type.js";
import { updateUser } from "../../users.js";

export const UserResolver ={
    Query: {
        getAllUsers: async () => {
            return await UserModel.getAll();
        },
        getUserById: async (_: any, args: {id: string}) => {
            return await UserModel.get(args.id);
        }        
    },
    
    Mutation:  {
        createUser: async (_:any, args: {id: string, user: UserDBType}) => {
            return await UserModel.create(args.user);
        },

        updateUser: async (_:any, args: {id: string, user: UserDBType}) => {
            return await UserModel.update(args.id, args.user);
        },

        deleteUser: async (_:any, args: {id: string}) => {
            return await UserModel.delete(args.id);
        }
}

};

