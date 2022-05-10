const logger = require('../../plugins/logger')

module.exports = async (client, node) => {
	logger.info(`Node ${node.options.identifier} Reconnected`);
}