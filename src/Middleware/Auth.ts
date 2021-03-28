import { MiddlewareFn } from "type-graphql";

import log from "../Services/Log";
import Jwt from "../Helpers/Jwt";
import { MyContext } from "../Types/Abstract";

export const Auth: MiddlewareFn<MyContext> = ({ context }, next) => {
	const authorization = context.req.headers["authorization"];
	if (!authorization) throw "not authorized";
	try {
		const token = authorization.split(" ")[1];
		const payload = Jwt.Verify(token);
		context.payload = payload;
	} catch (error) {
		log.error(error);
		throw new Error(error);
	}
	return next();
};