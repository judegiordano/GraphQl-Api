import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";

import User from "../../Repositories/UserRepository";
import Jwt from "../../Helpers/Jwt";
import { Users } from "../../Models/User";
import log from "../../Services/Log";
import { MyContext } from "../Abstract";
import config from "../../Helpers/Config";

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
		@Arg("password") password: string,
		@Ctx() { res }: MyContext
	): Promise<LoginResponse> {
		const user = await User.Login({
			email,
			password
		});

		res.cookie("jid", Jwt.SignRefresh(user), {
			httpOnly: true,
			secure: config.IS_PROD
		});

		return { accessToken: Jwt.Sign(user) };
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