import { typeDefs } from "./typedefs/typedefs.js";
import { UserResolver } from "./resolvers/users.resolver.js";

export const resolvers = {
    Query: {
        ...UserResolver.Query
    },
    Mutation: {
        ...UserResolver.Mutation
    }

    

}

export { typeDefs }