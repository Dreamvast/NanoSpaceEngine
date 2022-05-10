const delay = require("delay");
const logger = require('../../plugins/logger')

module.exports = async (client, id) => {
    await delay(4000);
    logger.info(`Shard ${id} Shard ready!`);
}