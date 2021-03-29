import Express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import router from "../Controllers/index";
import config from "../Helpers/Config";

const app = Express();

app.use(cookieParser());

// dev configurations
if (!config.IS_PROD) {
	app.use(helmet({
		contentSecurityPolicy: false
	}));
}
// production configurations
if (config.IS_PROD) {
	app.use(helmet({
		contentSecurityPolicy: {
			directives: {
				baseUri: ["'self'"],
				blockAllMixedContent: [],
				upgradeInsecureRequests: [],
				defaultSrc: ["'self'", "'unsafe-inline'"],
				fontSrc: ["'self'", "https:", "data:"],
				scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
				objectSrc: ["'none'"],
				frameAncestors: ["'self'"],
				imgSrc: ["'self'", "data:"]
			}
		}
	}));
}
app.use("/api", router);

export default app;