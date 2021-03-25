import { ConnectionOptions } from "typeorm";

import config from "./Config";

export default {
	type: config.DB_TYPE,
	database: config.DB_NAME,
	synchronize: !config.IS_PROD,
	logging: !config.IS_PROD,
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 2000,
	entities: [
		`${config.IS_COMPILED ? "build" : "src"}/Models/**/*.${config.IS_COMPILED ? "js" : "ts"}`
	],
	migrations: [
		`${config.IS_COMPILED ? "build" : "src"}/Migrations/**/*.${config.IS_COMPILED ? "js" : "ts"}`
	]
} as ConnectionOptions;
