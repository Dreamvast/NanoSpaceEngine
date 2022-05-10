const logger = require('../../plugins/logger')

module.exports = async (client) => {
    logger.warn(`${client.user.tag} (${client.user.id})`);
};
