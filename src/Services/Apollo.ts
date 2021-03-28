import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { UserResolver } from "../Types/Resolvers/UserResolver";
import config from "../Helpers/Config";

async function InitApollo(): Promise<ApolloServer> {
	try {
		return new ApolloServer({
			schema: await buildSchema({
				resolvers: [UserResolver]
			}),
			context: ({ req, res }) => ({ req, res }),
			playground: !config.IS_PROD,
			introspection: !config.IS_PROD
		});
	} catch (error) {
		throw Error(error);
	}
}

export default InitApollo;