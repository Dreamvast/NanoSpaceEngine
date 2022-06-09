const { MessageEmbed } = require('discord.js');
const GControl = require('../../plugins/guildConfig.js');
const logger = require('../../plugins/logger')
module.exports = {
    config: {
        name: "control",
        aliases: ["setcontrol"],
        usage: "",
        category: "utilities",
        description: "Change the player control for the bot (enable or disable)",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('You need the `MANAGE_GUILD` permission to use this command.');
        if(!args[0]) return message.channel.send(`**Please specify a mode! (enable or disable)**`);
        if(args[0] !== 'enable' && args[0] !== 'disable') return message.channel.send(`**The mode can't be another word! Only enable or disable**`);

        const guildControl = await GControl.findOne({ guild: message.guild.id });
        if(!guildControl) {
            const guildControl = new GControl({
                guild: message.guild.id,
                playerControl: args[0]
            });
            guildControl.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`**The mode has been set to \`${args[0]}\`**`)
                .setColor(client.color)

                message.channel.send({ embeds: [embed] });
            }
            ).catch((err) => {
                message.channel.send(`**An error occured while setting the mode!**`)
                console.log(err)
            });
        }
        else if(guildControl) {
            guildControl.playerControl = args[0];
            guildControl.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`**The mode has been changed to \`${args[0]}\`**`)
                .setColor(client.color)
    
                message.channel.send({ embeds: [embed] });
            }
            ).catch((err) => {
                message.channel.send(`**An error occured while changing the mode!**`);
                console.log(err)
            });
        }
    }
}