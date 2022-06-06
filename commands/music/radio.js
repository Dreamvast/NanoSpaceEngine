const { convertTime } = require("../../structures/convert.js")
const { MessageEmbed } = require("discord.js");


module.exports = { 
    config: {
        name: "radio",
        description: "Play a song from radio",
        category: "music",
        accessableby: "Member",
        aliases: ["ra"]
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send('** :notes: Loading please wait...**')
        const { channel } = message.member.voice;
        if (!channel) return msg.edit("You need to be in a voice channel to use command.");

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });
        
        const state = player.state;
        if (state != "CONNECTED") await player.connect();
        client.manager.search("https://www.youtube.com/watch?v=5qap5aO4i9A").then(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);
                    message.delete()

                    const embed = new MessageEmbed()
                        .setDescription(`**Radio mode has been turned on. | ✅**`)
                        .setColor(client.color)
                    msg.edit({ content: " ", embeds: [embed] });
                    player.twentyFourSeven = true;
                    logger.info(`[Command/Logger] Radio used by ${message.author.tag} from ${message.guild.name}`);
                        if (!player.playing) player.play()
                        break;

                case "LOAD_FAILED":
                    const loadfailed = new MessageEmbed()
                        .setDescription(`**❎ | Track Load Failed! **`)
                    msg.edit({ embeds: [loadfailed] })

                case "NO_MATCHES":
                    const nomatches = new MessageEmbed()
                    .setDescription(`**❎ | Track Load Failed! **`)
                    msg.edit({ embeds: [nomatches] })
            }
        }).catch(err => msg.edit(err.message))
    }
}
