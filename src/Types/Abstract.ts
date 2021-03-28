import { Request, Response } from "express";
import { IJwtPayload } from "./Jwt";

export interface MyContext {
	req: Request,
	res: Response
	payload?: IJwtPayload
}