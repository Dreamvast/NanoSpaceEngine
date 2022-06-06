const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ms = require('pretty-ms');
const { Node } = require("erela.js");
const node = new Node({ host: `${process.env.NODE_HOST}` })

module.exports = {
    config: {
        name: "node",
        description: "Shows the Information of the current node",
        usage: "node",
        category: "utilities",
        accessableby: "Members",
        aliases: ["nodeinfo"]
    },
    run: async (client, message, args) => {
    const nodestats = new MessageEmbed()
        .setTitle("Lavalink Information")
        .addField('Server Information', `\`\`\`
Host: ${node.options.identifier}
Port: ${node.options.port}
Password: ${node.options.password}
Uptime: ${ms(node.stats.uptime)}\`\`\``, 
        false)
        .addField('Cpu Usuage', `\`\`\`
Core: ${node.stats.cpu.cores}
Lavalink Load: ${(node.stats.cpu.lavalinkLoad).toFixed(2)}
System Load: ${(node.stats.cpu.systemLoad).toFixed(2)}\`\`\``, 
        false)
        .addField('Memory Usuage', `\`\`\`
Total: ${(node.stats.memory.allocated / 1024 / 1024).toFixed(2)} MB
Free: ${(node.stats.memory.free / 1024 / 1024).toFixed(2)} MB
Reservable: ${(node.stats.memory.reservable / 1024 / 1024).toFixed(2)} MB
Used: ${(node.stats.memory.used / 1024 / 1024).toFixed(2)} MB\`\`\``, 
        false)
        .addField('Server Players', `\`\`\`
All players: ${node.stats.players}
Playing players: ${node.stats.playingPlayers}\`\`\``, 
        false)
        .setTimestamp()
        .setFooter({ text: "Hope you like me!" })
        .setColor(client.color);

    const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel("Invite Me")
            .setStyle("LINK")
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        )
  
    await message.channel.send({ embeds: [nodestats], components: [row] });
            
    }
};