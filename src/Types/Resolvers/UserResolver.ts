import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import User from "../../Repositories/UserRepository";
import Jwt from "../../Helpers/Jwt";
import log from "../../Services/Log";
import config from "../../Helpers/Config";
import { LoginResponse } from "./Abstract/Users";
import { Users } from "../../Models/User";
import { MyContext } from "../Abstract";
import { Auth } from "../../Middleware/Auth";

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

	@Query(() => String)
	@UseMiddleware(Auth)
	bye(
		@Ctx() { payload }: MyContext
	): string {
		return `user id ${payload.id}`;
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