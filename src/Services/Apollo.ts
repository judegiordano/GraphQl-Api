import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { UserResolver } from "../Types/Resolvers/UserResolver";

async function InitApollo(): Promise<ApolloServer> {
	try {
		return new ApolloServer({
			schema: await buildSchema({
				resolvers: [UserResolver]
			})
		});
	} catch (error) {
		throw Error(error);
	}
}

export default InitApollo;