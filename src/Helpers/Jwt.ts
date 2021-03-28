import jwt from "jsonwebtoken";

import config from "./Config";
import { Users } from "../Models/User";
import { IJwtPayload } from "../Types/Jwt";

export default class Jwt {

	public static Sign(user: Users): string {
		try {
			return jwt.sign({ id: user.id }, config.JWT_SECRET, {
				expiresIn: config.JWT_EXPIRATION
			});
		} catch (error) {
			throw Error(error);
		}
	}

	public static SignRefresh(user: Users): string {
		try {
			return jwt.sign({ id: user.id }, config.JWT_REFRESH_SECRET, {
				expiresIn: config.JWT_REFRESH_EXPIRATION
			});
		} catch (error) {
			throw Error(error);
		}
	}

	public static Verify(token: string): IJwtPayload {
		try {
			const data = jwt.verify(token, config.JWT_SECRET) as IJwtPayload;
			return { id: data.id };
		} catch (error) {
			throw Error(error);
		}
	}

	public static VerifyRefresh(token: string): IJwtPayload {
		try {
			const data = jwt.verify(token, config.JWT_REFRESH_SECRET) as IJwtPayload;
			return { id: data.id };
		} catch (error) {
			throw Error(error);
		}
	}
}