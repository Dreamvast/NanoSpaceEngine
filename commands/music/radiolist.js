//Inspired by YandereDev
  const { MessageEmbed, MessageActionRow, MessageSelectMenu, Discord } = require("discord.js");
  const config = require("../../plugins/config.js");
  const emoji = require("../../data/emojis.json");
  const { readdirSync } = require("fs");
  const { stripIndents } = require("common-tags");
  const streams = require("../../data/streams")
  
  
  
  module.exports = {
    config: {
      name: "radiolist",
      aliases: ["rl"],
      category: "music",
      description: "Displays all radio that the bot has.",
      accessableby: "Members"
    },
        run: async (client, message, args) => {
        //Important
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
  
      //Radio List
      let helpmenu = new MessageEmbed()
          .setAuthor({ name: "Radio List" })
          .setDescription(`**Select the radio you want to listen to.** 
  - Radio source: https://ilovemusic.de. 
  - Support 25 streams radio.
  - *If there are any broken links, please let me know so I can update.*
  - Note: radiolist is not 24/7`)
  
          .setFooter({ text: "Thanks for choosing me :)" })
          .setColor(`#008dde`)
  
          const row = new MessageActionRow()
          .addComponents(
              new MessageSelectMenu()
                  .setCustomId('helpop')
                  .setPlaceholder('Choose your favorite radio!')
               .addOptions([               
                  {
                      label: '1. I LOVE RADIO',
                      description: `${streams.s1}`,
                      value: '!1',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '2. DANCE',
                      description: `${streams.s2}`,
                      value: '!2',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '3. BASS BY HBZ',
                      description: `${streams.s3}`,
                      value: '!3',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '4. CHILLHOP',
                      description: `${streams.s4}`,
                      value: '!4',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '5. DANCE 2022',
                      description: `${streams.s5}`,
                      value: '!5',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '6. DANCE FIRST!',
                      description: `${streams.s6}`,
                      value: '!6',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '7. DANCE HISTORY',
                      description: `${streams.s7}`,
                      value: '!7',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '8. DEUTSCHRAP BESTE',
                      description: `${streams.s8}`,
                      value: '!8',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '9. DEUTSCHRAP FIRST!',
                      description: `${streams.s9}`,
                      value: '!9',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '10. GREATEST HITS',
                      description: `${streams.s10}`,
                      value: '!10',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '11. HARDSTYLE',
                      description: `${streams.s11}`,
                      value: '!11',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '12. HIP HOP',
                      description: `${streams.s12}`,
                      value: '!12',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '13. HIP HOP 2022',
                      description: `${streams.s13}`,
                      value: '!13',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '14. HIP HOP HISTORY',
                      description: `${streams.s14}`,
                      value: '!14',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '15. HITS 2022',
                      description: `${streams.s15}`,
                      value: '!15',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '16. HITS HISTORY',
                      description: `${streams.s16}`,
                      value: '!16',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '17. MAINSTAGE',
                      description: `${streams.s17}`,
                      value: '!17',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '18. MASHUP',
                      description: `${streams.s18}`,
                      value: '!18',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '19. MONSTERCAT',
                      description: `${streams.s19}`,
                      value: '!19',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '20. MUSIC&CHILL',
                      description: `${streams.s20}`,
                      value: '!20',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '21. NEW POP',
                      description: `${streams.s21}`,
                      value: '!21',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '22. PARTY HARD',
                      description: `${streams.s22}`,
                      value: '!22',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '23. RADIO FROM MARS',
                      description: `${streams.s23}`,
                      value: '!23',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '24. REMIX RADIO',
                      description: `${streams.s24}`,
                      value: '!24',
                      emoji: emoji.categories.Playing
                  },
                  {
                      label: '25. ROBIN SCHULZ',
                      description: `${streams.s25}`,
                      value: '!25',
                      emoji: emoji.categories.Playing
                  },
              ])                        
          )
  
  client.on('interactionCreate', async interaction => {
      if (!interaction.isSelectMenu()) return;
      let options = interaction.values;
      const radio = options[0]

     async function loadradio(radioLink) {
          const embed1 = new MessageEmbed()
                .setDescription(`**✅ | Radio mode has been turned on. Please wait....**`)
                .setColor('#000001')
              await interaction.reply({ embeds: [embed1], ephemeral: true });
        client.manager.search(radioLink).then(async res => {
          switch (res.loadType) {
            case "TRACK_LOADED":
              player.play(res.tracks[0]);
                break;
        
              case "LOAD_FAILED":
                const loadfailed1 = new MessageEmbed()
                  .setDescription(`**❎ | Radio Load Failed! **`)
              await interaction.reply({ embeds: [loadfailed1], ephemeral: true})
        
              case "NO_MATCHES":
                const nomatches1 = new MessageEmbed()
                  .setDescription(`**❎ | Radio Load Failed! **`)
              await interaction.reply({ embeds: [nomatches1], ephemeral: true})
            }
        }).catch(err => msg.edit(err.message))
      }

      switch (radio) {
        case "!1":
          loadradio(`${streams.s1}`)
          break
        case "!2":
          loadradio(`${streams.s2}`)
          break
        case "!3":
          loadradio(`${streams.s3}`)
          break
        case "!4":
          loadradio(`${streams.s4}`)
          break
        case "!5":
          loadradio(`${streams.s5}`)
          break
        case "!6":
          loadradio(`${streams.s6}`)
          break
        case "!7":
          loadradio(`${streams.s7}`)
          break
        case "!8":
          loadradio(`${streams.s8}`)
          break
        case "!9":
          loadradio(`${streams.s9}`)
          break
        case "!10":
          loadradio(`${streams.s10}`)
          break
        case "!11":
          loadradio(`${streams.s11}`)
          break
        case "!12":
          loadradio(`${streams.s12}`)
          break
        case "!13":
          loadradio(`${streams.s13}`)
          break
        case "!14":
          loadradio(`${streams.s14}`)
          break
        case "!15":
          loadradio(`${streams.s15}`)
          break
        case "!16":
          loadradio(`${streams.s16}`)
          break
        case "!17":
          loadradio(`${streams.s17}`)
          break
        case "!18":
          loadradio(`${streams.s18}`)
          break
        case "!19":
          loadradio(`${streams.s19}`)
          break
        case "!20":
          loadradio(`${streams.s20}`)
          break
        case "!21":
          loadradio(`${streams.s21}`)
          break
        case "!22":
          loadradio(`${streams.s22}`)
          break
        case "!23":
          loadradio(`${streams.s23}`)
          break
        case "!24":
          loadradio(`${streams.s24}`)
          break
        case "!25":
          loadradio(`${streams.s25}`)
          break      
      }
  })
          msg.edit({ embeds: [helpmenu], components: [row], content: " "})
        
      }
  }
  