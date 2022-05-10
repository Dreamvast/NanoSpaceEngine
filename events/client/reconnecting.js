const logger = require('../../plugins/logger')
module.exports = async (client) => {
    logger.info(`(RECONNECTING] ${client.user.tag} (${client.user.id})`);
};
