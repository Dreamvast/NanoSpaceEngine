const logger = require('../../plugins/logger')

module.exports = async (client) => {
    logger.error(`[DISCONNECTED] ${client.user.tag} (${client.user.id})`);
};
