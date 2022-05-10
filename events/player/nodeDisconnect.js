const logger = require('../../plugins/logger')

module.exports = async (client, node, reason) => {
	logger.error(`Node ${node.options.identifier} Disconnected: ${reason}`);
}