const logger = require('../../plugins/logger')

module.exports = async (client) => {
    logger.error(`${client.user.tag} (${client.user.id})`);
};
