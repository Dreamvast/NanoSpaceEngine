const logger = require('../../plugins/logger')

module.exports = async (client, player, message) => {
	logger.info(`Player Destroyed from [GUILDID] ${player.guild}`);
}