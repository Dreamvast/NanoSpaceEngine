const delay = require("delay");
const logger = require('../../plugins/logger')

module.exports = async (client, node) => {
	await delay(4000);
	logger.info(`Node ${node.options.identifier} Connected`);
}