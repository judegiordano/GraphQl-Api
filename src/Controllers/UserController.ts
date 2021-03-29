import express, { Request, Response, Router } from "express";

import Jwt from "../Helpers/Jwt";
import log from "../Services/Log";
import User from "../Repositories/UserRepository";
import config from "../Helpers/Config";

const router: Router = express.Router();

router.post("/refresh", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const token = req.cookies.jid as string;

		if (!token) {
			return res.send({ ok: false, accessToken: "" });
		}
		const payload = Jwt.VerifyRefresh(token);
		const user = await User.FindOne(payload.id);

		if (user.tokenVersion !== payload.tokenVersion) {
			return res.send({ ok: false, accessToken: "" });
		}

		res.cookie("jid", Jwt.SignRefresh(user), {
			httpOnly: true,
			secure: config.IS_PROD
		});

		return res.send({ ok: true, accessToken: Jwt.Sign(user) });
	} catch (e) {
		log.error(e);
		return res.send({ ok: false, accessToken: "" });
	}
});

export default router;