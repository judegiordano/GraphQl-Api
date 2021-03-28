import { Router } from "express";

import User from "./UserController";

const router: Router = Router();

router.use("/user", User);

export default router;