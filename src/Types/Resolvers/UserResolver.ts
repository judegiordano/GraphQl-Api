import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";

import User from "../../Repositories/UserRepository";
import { Users } from "../../Models/User";
import log from "../../Services/Log";

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string
}

@Resolver()
export class UserResolver {

	@Query(() => [Users])
	async users(): Promise<Users[] | boolean> {
		try {
			return await Users.find();
		} catch (error) {
			log.error(error);
			return false;
		}
	}

	@Mutation(() => LoginResponse)
	async login(
		@Arg("email") email: string,
		@Arg("password") password: string
	): Promise<LoginResponse> {
		const user = await User.Login({
			email,
			password
		});

		log.info(user);

		return {
			accessToken: "blahblah"
		};
	}

	@Mutation(() => Boolean)
	async register(
		@Arg("email") email: string,
		@Arg("password") password: string
	): Promise<boolean> {
		try {
			await User.Register({
				email,
				password
			});

			return true;
		} catch (error) {
			log.error(error);
			return false;
		}
	}
}