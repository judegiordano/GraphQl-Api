import "reflect-metadata";
import cluster from "cluster";

import app from "./Services/Server";
import init from "./Services/Apollo";
import connect from "./Services/Database";
import log from "./Services/Log";
import config from "./Helpers/Config";

const start = async () => {
	try {
		await connect();
		const apollo = await init();
		apollo.applyMiddleware({ app });
		app.listen(config.PORT);
		log.info(`listening on http://${config.HOST}:${config.PORT}/graphql`);
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
};

if (cluster.isMaster) {
	for (let i = 0; i < config.CORES; i++) {
		cluster.fork();
	}
}
else start();
