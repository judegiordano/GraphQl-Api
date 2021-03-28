import express, { Request, Response, Router } from "express";

import Jwt from "../Helpers/Jwt";
import log from "../Services/Log";
import User from "../Repositories/UserRepository";

const router: Router = express.Router();

router.post("/refresh", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		console.log(req.cookies);
		const token = req.cookies.jid;
		if (!token) {
			return res.send({ ok: false, accessToken: "" });
		}
		const payload = Jwt.VerifyRefresh(token);
		const user = await User.FindOne(payload.id);

		return res.send({ ok: true, accessToken: Jwt.Sign(user) });
	} catch (e) {
		log.error(e);
		return res.send({ ok: false, accessToken: "" });
	}
});

export default router;