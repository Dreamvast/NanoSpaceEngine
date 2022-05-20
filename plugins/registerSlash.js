const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = null
const TOKEN = process.env.TOKEN
const logger = require('./logger')
const ms = require('pretty-ms');
const GPrefix = require('./guildConfig.js');
this.config = require("./config.js");
this.prefix = this.config.PREFIX;

client.on('ready', () => {
  logger.info(`Application (/) commands logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  const guildsize = `${client.guilds.cache.size}`
  const usersize = `${client.users.cache.size}`

  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'prefix') {
    if (!interaction.memberPermissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "**You Don't Have The Permission Manage Messages for use this command!**", ephemeral: true });
      const PREFIX = this.prefix;
      let PREFIX1 = this.prefix;
      const GuildPrefix = await GPrefix.findOne({ guild: interaction.guild.id });
      if(GuildPrefix && GuildPrefix.prefix) PREFIX1 = GuildPrefix.prefix;

    const prefix = new MessageEmbed()
      .setDescription(`The bot prefix is: **${PREFIX}** \n ${interaction.guild.name} prefix is: **${PREFIX1}** \n __**To use help, use ${PREFIX1}help command!**__`)
      .setFooter({ text: "Hope you like me!" })
      .setColor("#3498DB");
    await interaction.reply({ embeds: [prefix] });

  } else if (interaction.commandName === 'info') {
      const info = new MessageEmbed()
        .setTitle(client.user.tag + " Information")
        .addField('Uptime', `\`\`\`${ms(client.uptime)}\`\`\``, true)
        .addField('WebSocket Ping', `\`\`\`${client.ws.ping}ms\`\`\``, true)
        .addField('Memory', `\`\`\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap\`\`\``, true)
        .addField('Guild Count', `\`\`\`${guildsize} guilds\`\`\``, true)
        .addField(`User Count`, `\`\`\`${usersize} users\`\`\``, true)
        .addField('Node', `\`\`\`${process.version} on ${process.platform} ${process.arch}\`\`\``, true)
        .setTimestamp()
        .setFooter({ text: "Hope you like me!" })
        .setColor("#3498DB");
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("Invite Me")
          .setStyle("LINK")
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
      )
    await interaction.reply({ embeds: [info], components: [row] });
  } else if (interaction.commandName === 'setprefix') {
    if (!interaction.memberPermissions.has("MANAGE_GUILD")) return interaction.reply({ content: "**You Don't Have The Permission Manage Guild for use this command!**", ephemeral: true });
    const args = interaction.options.get("prefix").value;
        if(!args) return interaction.reply(`**Please specify a prefix!**`);
        if(args.length > 10) return message.channel.send(`**The prefix can't be longer than 10 characters!**`);

        const newPrefix = await GPrefix.findOne({ guild: interaction.guild.id });
        if(!newPrefix) {
            const newPrefix = new GPrefix({
                guild: interaction.guild.id,
                prefix: args
            });
            newPrefix.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`**The prefix has been set to \`${args}\`**`)
                .setColor('#000001')

            return interaction.reply({ embeds: [embed] });
            }
            ).catch(() => {
                return interaction.reply(`**An error occured while setting the prefix!**`);
            });
        }
        else if(newPrefix) {
            newPrefix.prefix = args;
            newPrefix.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`**The prefix has been changed to \`${args}\`**`)
                .setColor('#000001')
    
                interaction.reply({ embeds: [embed] });
            }
            ).catch(() => {
                interaction.reply(`**An error occured while changing the prefix!**`);
            });
        }
  }
})

const commands = [{
  name: 'prefix',
  description: 'Forgot the prefix of this bot in your server? This command will help you find the prefix again!'
},{
  name: 'info',
  description: 'Information of the bot.'
},{
  name: 'setprefix',
  description: 'Change prefix of the bot.',
  options:[
    {
      name: 'prefix',
      description: 'Type the prefix you want here.',
      required: true,
      type: 3
    }
  ]
}]; 

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
  try {
    if (!GUILD_ID) {
      logger.info('Started refreshing global application (/) commands.');
      await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: commands },
      );
      logger.info('Successfully reloaded global application (/) commands.');
    } else {
      logger.info('Started refreshing application (/) commands.');
      await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        { body: commands },
      );
      logger.info('Successfully reloaded application (/) commands.');
    }
  } catch (error) {
    console.error(error);
  }
})();

client.login(TOKEN);