const logger = require('../../plugins/logger')

module.exports = async (client, player) => {
	logger.info(`Player Destroyed from [GUILDID] ${player.guild}`);
}