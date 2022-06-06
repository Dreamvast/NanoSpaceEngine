const delay = require('delay');
const { MessageEmbed } = require('discord.js');
const { soft } = require('../../config/filter');

module.exports = { 
    config: {
        name: "soft",
        description: "Turning on soft filter",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },

    run: async (client, message) => {
        const msg = await message.channel.send("Turning on **Soft**. This may take a few seconds...");

        const player = client.manager.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        await player.setFilter('filters', soft);

        const softed = new MessageEmbed()
            .setAuthor({ name: "Turned on: Soft", iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor(client.color);

        await delay(5000);
        msg.edit({ content: " ", embeds: [softed] });
   }
};