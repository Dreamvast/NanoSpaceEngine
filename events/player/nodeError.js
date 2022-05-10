const logger = require('../../plugins/logger')

module.exports = async (client, node, error) => {
	logger.error(`Node ${node.options.identifier} Error: ${error}`);
}