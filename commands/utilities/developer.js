const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    config: {
        name: "developer",
        description: "Shows the information about the Developer",
        usage: "developer",
        category: "utilities",
        accessableby: "Members",
        aliases: ["dev"]
    },
    run: async (client, message, args) => {

    const xeondex = new MessageEmbed()
        .setTitle("Adivise/XeonDex | I'm just remake from Adivise")
        .setDescription("This is a remade music bot with added features. Special thanks to Adivise.")
        .setFooter({ text: "Consider Joining the server or Inviting the Bot :) This would help me alot!" })
        .setColor("#3498DB");

const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel("Github (Adivise)")
        .setStyle("LINK")
        .setURL("https://github.com/Adivise")
    )
    .addComponents(
      new MessageButton()
        .setLabel("Github (XeonDex)")
        .setStyle("LINK")
        .setURL("https://github.com/XeonE52680v3")
    )
	.addComponents(
    	new MessageButton()
        	.setLabel("Support Server")
        	.setStyle("LINK")
        	.setURL("https://discord.com/invite/xHvsCMjnhU")
    )

  
    await message.channel.send({ embeds: [xeondex], components: [row] });
            
    }
};