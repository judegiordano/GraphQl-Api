import Express from "express";
import cookieParser from "cookie-parser";

import router from "../Controllers/index";

const app = Express();

app.use(cookieParser());
app.use("/api", router);

export default app;