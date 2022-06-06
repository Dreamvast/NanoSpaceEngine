const { MessageEmbed } = require("discord.js");
const Client = require("../../index.js");
const { Player } = require("erela.js");

module.exports = async (client, player, oldChannel, newChannel) => {
      const guild = client.guilds.cache.get(player.guild)
      if(!guild) return;
      const channel = guild.channels.cache.get(player.textChannel);
        if(oldChannel === newChannel) return;
        if(newChannel === null || !newChannel) {
        if(!player) return;

        const embed = new MessageEmbed()
        .setTitle("Disconnected")
        .setDescription(`I've been disconnected from <#${oldChannel}>.`)
        .setTimestamp()
        .setColor(client.color)

        if(channel) await channel.send({ embeds: [embed] })
         return player.destroy();
      } else {
        player.voiceChannel = newChannel;

        const embed = new MessageEmbed()
        .setTitle("Moved")
        .setDescription(`I've been moved to <#${player.voiceChannel}>.`)
        .setTimestamp()
        .setColor(client.color)
        
        if(channel) await channel.send({embeds: [embed] });
        if(player.paused) player.pause(false);
      }

}