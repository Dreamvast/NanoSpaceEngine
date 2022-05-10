const logger = require('../../plugins/logger')

module.exports = async (client, id) => {
    logger.warn(`Shard ${id} Shard Disconnected!`);
}