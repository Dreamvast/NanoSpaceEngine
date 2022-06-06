const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');


module.exports = {
    config: {
        name: "invite",
        description: "invite the bot",
        usage: "invite",
        category: "utilities",
        accessableby: "Members",
        aliases: ["inv", "add"]
    },
    run: async (client, message, args) => {

    const invite = new MessageEmbed()
        .setTitle(`**Thanks for Inviting ${client.user.username}**`)
        .setDescription(`**${client.user.username} Powered by Adivise/XeonDex**`)
    	.addField('Nanospace:', `https://adivise.github.io/Stylish/`)
    	.addField(`${client.user.username}`, `https://top.gg/bot/958642964018642944`)
        .setTimestamp()
        .setColor(client.color);

    const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel("Invite Me")
            .setStyle("LINK")
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        )
  
    await message.channel.send({ embeds: [invite], components: [row] });
            
    }
};