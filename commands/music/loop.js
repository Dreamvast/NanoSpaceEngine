const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "loop",
        aliases: ["repeat"],
        description: "loop the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<current, all>"
    },
    run: async (client, message, args) => {
		const msg = await message.channel.send('Loading please wait...');

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		if (!args[0] || args[0].toLowerCase() == 'current') {
			if (player.trackRepeat === false) {
				player.setTrackRepeat(true);

				const looped = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is loop:** \`Current\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [looped] });
			}
			else {
				player.setTrackRepeat(false);

				const unlooped = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is unloop:** \`Current\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [unlooped] });
			}
		}
		else if (args[0] == 'all') {
			if (player.queueRepeat === true) {
				player.setQueueRepeat(false);

				const unloopall = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is unloop:** \`All\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [unloopall] });
			}
			else {
				player.setQueueRepeat(true);

				const loopall = new MessageEmbed()
					.setDescription(`\`🔁\` | **Song is loop:** \`All\``)
					.setColor('#000001');

					msg.edit({ content: " ", embeds: [loopall] });
			}
		}
	}
};