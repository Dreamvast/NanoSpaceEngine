const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { convertTime } = require("../../structures/convert.js")
const logger = require('../../plugins/logger')
const formatDuration = require('../../structures/formatduration.js')


module.exports = {
    config: {
        name: "play",
        description: "Play a song/playlist or search for a song from youtube",
        usage: "<results>",
        category: "music",
        accessableby: "Member",
        aliases: ["p", "pplay"]
    },
    run: async (client, message, args, track) => {
        message.delete()
        const msg = await message.channel.send('** :notes: Loading please wait...**')
        const { channel } = message.member.voice;
        if (!channel) return msg.edit("You need to be in a voice channel to use command.");
        if (!args[0]) return msg.edit("Please provide a song name or link to search.");
        if (args.join(" ").startsWith("https://open.spotify.com/artist/")) return msg.edit("Please use spotify `playlists, album or track` this `artist` not support!");
        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });
        if (player.playing === true){
          if (!channel || message.member.voice.channel !== message.guild.me.voice.channel){
            return msg.edit("You need to be in a same/voice channel.");
          }
        }
        const state = player.state;
        if (state != "CONNECTED") await player.connect();
        client.manager.search(args.join(" "), message.author).then(async res => {
            switch (res.loadType) {
                //--------------------------------------------------------------------------------------------
                case "TRACK_LOADED":
                player.queue.add(res.tracks[0]);

                const embed = new MessageEmbed()
                    .setDescription(`**Queued • [${res.tracks[0].title}](${res.tracks[0].uri})** \`${convertTime(res.tracks[0].duration, true)}\` • ${res.tracks[0].requester}`)
                    .setColor('#000001')
                    const row = new MessageActionRow()
                        .addComponents(
                          new MessageButton()
                            .setCustomId("loop")
                            .setEmoji("🔄")
                            .setStyle("SECONDARY")
                            .setLabel("Loop!")
                        )
                        .addComponents(
                          new MessageButton()
                            .setCustomId("rewind")
                            .setEmoji("⏪")
                            .setStyle("SECONDARY")
                            .setLabel("10s")
                        )
                        .addComponents(
                          new MessageButton()
                            .setCustomId("forward")
                            .setEmoji("⏩")
                            .setStyle("SECONDARY")
                            .setLabel("10s")
                        )
                      const nplaying = await msg.edit({ embeds: [embed], components: [row], content: " " });

                      const filter = (message) => {
                        if (message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
                        else {
                          message.reply({ content: "You need to be in a same/voice channel.", ephemeral: true });
                        }
                      };
                      const collector = nplaying.createMessageComponentCollector({ filter, time: res.tracks[0].duration });
                        collector.on('collect', async (message) => {
                        const id = message.customId;
                        const CurrentDuration = formatDuration(player.position);
                        const song = player.queue.current;
                        if (id === "loop") {
                          if (!player) {
                            collector.stop();
                          }
                          await player.setTrackRepeat(!player.trackRepeat);
                          const uni = player.trackRepeat ? "Enabled" : "Disabled";

                          const embed = new MessageEmbed()
                            .setDescription(`\`🔁\` **Loop has been:** \`${uni}\``)
                            .setColor('#008dde');

                          await message.reply({ embeds: [embed], ephemeral: true });
                        } else if (id === "rewind") {
                          if (!player) {
                            collector.stop();
                          }
                            if((player.position - 10 * 1000) > 0) {
                              await player.seek(player.position - 10 * 1000);
                              
                              const rewind = new MessageEmbed()
                              .setDescription("\`⏮\` | **Rewind to:** "+ `\`${CurrentDuration}\``)
                              .setColor('#000001');
              
                              await message.reply({ embeds: [rewind], ephemeral: true });
                          }
                          else {
                              return message.reply(`Cannot rewind beyond ${CurrentDuration}`);
                          }
                        } else if (id === "forward") {
                          if((player.position + 10 * 1000) < song.duration) {
                            if (!player) {
                              collector.stop();
                            }
                              player.seek(player.position + 10 * 1000);
                              
                              const forward = new MessageEmbed()
                              .setDescription("\`⏭\` | **Forward to:** "+ `\`${CurrentDuration}\``)
                              .setColor('#000001');
              
                              await message.reply({ embeds: [forward], ephemeral: true });
              
                          } else { 
                              return message.reply('Cannot forward beyond the song\'s duration.'); 
                          }
                        }
                      })

                    logger.info(`[Command/Logger] Play used by ${message.author.tag} from ${message.guild.name}`);
                    if (!player.playing) player.play()
                    break;
                //--------------------------------------------------------------------------------------------
                case "SEARCH_RESULT":
                const res1 = await client.manager.search(
                    message.content.slice(6),
                    message.author
                );
                    player.queue.add(res1.tracks[0]);

                    const embed1 = new MessageEmbed()
                        .setDescription(`**Queued • [${res1.tracks[0].title}](${res1.tracks[0].uri})** \`${convertTime(res1.tracks[0].duration, true)}\` • ${res1.tracks[0].requester}`)
                        .setColor('#000001')
                        const row1 = new MessageActionRow()
                        .addComponents(
                          new MessageButton()
                            .setCustomId("loop")
                            .setEmoji("🔄")
                            .setStyle("SECONDARY")
                            .setLabel("Loop!")
                        )
                        .addComponents(
                          new MessageButton()
                            .setCustomId("rewind")
                            .setEmoji("⏪")
                            .setStyle("SECONDARY")
                            .setLabel("10s")
                        )
                        .addComponents(
                          new MessageButton()
                            .setCustomId("forward")
                            .setEmoji("⏩")
                            .setStyle("SECONDARY")
                            .setLabel("10s")
                        )
                      const nplaying1 = await msg.edit({ embeds: [embed1], components: [row1], content: " " });

                      const filter1 = (message) => {
                        if (message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
                        else {
                          message.reply({ content: "You need to be in a same/voice channel.", ephemeral: true });
                        }
                      };
                      const collector1 = nplaying1.createMessageComponentCollector({ filter1, time: res.tracks[0].duration });
                        collector1.on('collect', async (message) => {
                        const id1 = message.customId;
                        const CurrentDuration1 = formatDuration(player.position);
                        const song1 = player.queue.current;
                        if (id1 === "loop") {
                          if (!player) {
                            collector.stop();
                          }
                          await player.setTrackRepeat(!player.trackRepeat);
                          const uni = player.trackRepeat ? "Enabled" : "Disabled";

                          const embed1 = new MessageEmbed()
                            .setDescription(`\`🔁\` **Loop has been:** \`${uni}\``)
                            .setColor('#008dde');

                          await message.reply({ embeds: [embed1], ephemeral: true });
                        } else if (id1 === "rewind") {
                          if (!player) {
                            collector.stop();
                          }
                          if((player.position - 10 * 1000) > 0) {
                            await player.seek(player.position - 10 * 1000);
                            
                            const rewind1 = new MessageEmbed()
                            .setDescription("\`⏮\` | **Rewind to:** "+ `\`${CurrentDuration1}\``)
                            .setColor('#000001');
            
                            await message.reply({ embeds: [rewind1], ephemeral: true });
                        }
                        else {
                            return message.reply(`Cannot rewind beyond ${CurrentDuration1}`);
                        }
                      } else if (id1 === "forward") {
                        if (!player) {
                          collector.stop();
                        }
                        if((player.position + 10 * 1000) < song1.duration) {
                            player.seek(player.position + 10 * 1000);
                            
                            const forward1 = new MessageEmbed()
                            .setDescription("\`⏭\` | **Forward to:** "+ `\`${CurrentDuration1}\``)
                            .setColor('#000001');
            
                            await message.reply({ embeds: [forward1], ephemeral: true });
            
                        } else { 
                            return message.reply('Cannot forward beyond the song\'s duration.'); 
                        }
                      }
                      })
                        logger.info(`[Command/Logger] Play used by ${message.author.tag} from ${message.guild.name}`);
                      if (!player.playing) player.play()
                    break;
                //--------------------------------------------------------------------------------------------
                case "PLAYLIST_LOADED":
                    let search = await player.search(args.join(" "), message.author);
                    player.queue.add(search.tracks)

                    const playlist = new MessageEmbed()
                        .setDescription(`**Queued** • [${search.playlist.name}](${args.join(" ")}) \`${convertTime(search.playlist.duration)}\` (${search.tracks.length} tracks) • ${search.tracks[0].requester}`)
                        .setColor('#000001')

                    const row2 = new MessageActionRow()
                        .addComponents(
                          new MessageButton()
                            .setCustomId("loop")
                            .setEmoji("🔄")
                            .setStyle("SECONDARY")
                            .setLabel("Loop!")
                        )
                        .addComponents(
                          new MessageButton()
                            .setCustomId("rewind")
                            .setEmoji("⏪")
                            .setStyle("SECONDARY")
                            .setLabel("10s")
                        )
                        .addComponents(
                          new MessageButton()
                            .setCustomId("forward")
                            .setEmoji("⏩")
                            .setStyle("SECONDARY")
                            .setLabel("10s")
                        )
                      const nplaying2 = await msg.edit({ embeds: [playlist], components: [row2], content: " " });

                      const filter2 = (message) => {
                        if (message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
                        else {
                          message.reply({ content: "You need to be in a same/voice channel.", ephemeral: true });
                        }
                      };
                      const collector2 = nplaying2.createMessageComponentCollector({ filter2, time: search.playlist.duration });
                        collector2.on('collect', async (message) => {
                        const id2 = message.customId;
                        const CurrentDuration2 = formatDuration(player.position);
                        const song2 = player.queue.current;
                        if (id2 === "loop") {
                          if (!player) {
                            collector.stop();
                          }
                          await player.setTrackRepeat(!player.trackRepeat);
                          const uni = player.trackRepeat ? "Enabled" : "Disabled";

                          const embed2 = new MessageEmbed()
                            .setDescription(`\`🔁\` **Loop has been:** \`${uni}\``)
                            .setColor('#008dde');

                          await message.reply({ embeds: [embed2], ephemeral: true });
                        } else if (id2 === "rewind") {
                          if (!player) {
                            collector.stop();
                          }
                          if((player.position - 10 * 1000) > 0) {
                            await player.seek(player.position - 10 * 1000);
                            
                            const rewind2 = new MessageEmbed()
                            .setDescription("\`⏮\` | **Rewind to:** "+ `\`${CurrentDuration2}\``)
                            .setColor('#000001');
            
                            await message.reply({ embeds: [rewind2], ephemeral: true });
                        }
                        else {
                            return message.reply(`Cannot rewind beyond ${CurrentDuration2}`);
                        }
                      } else if (id2 === "forward") {
                        if((player.position + 10 * 1000) < song2.duration) {
                          if (!player) {
                            collector.stop();
                          }
                            player.seek(player.position + 10 * 1000);
                            
                            const forward2 = new MessageEmbed()
                            .setDescription("\`⏭\` | **Forward to:** "+ `\`${CurrentDuration2}\``)
                            .setColor('#000001');
            
                            await message.reply({ embeds: [forward2], ephemeral: true });
            
                        } else { 
                            return message.reply('Cannot forward beyond the song\'s duration.'); 
                        }
                      } 
                      })

                        logger.info(`[Command/Logger] Play used by ${message.author.tag} from ${message.guild.name}`);
                        if(!player.playing) player.play()
                    break;
                //--------------------------------------------------------------------------------------------
                case "LOAD_FAILED":
                    const loadfailed = new MessageEmbed()
                        .setTitle(`❎ | No Result Found! `)
                        .setDescription(`**Please check your link to make sure it is valid.**`)
                        .setFooter({text: "Note: This bot only supports links of youtube, soundcloud, spotify, deezer and radio link."})
                    msg.edit({ content: " ", embeds: [loadfailed]})
                //--------------------------------------------------------------------------------------------
                case "NO_MATCHES":
                    const nomatches = new MessageEmbed()
                        .setTitle(`❎ | Track Load Failed! `)
                        .setDescription(`**Please check your link to make sure it is valid.**`)
                        .setFooter({text: "Note: This bot only supports links of youtube, soundcloud, spotify, deezer and radio link."})
                    msg.edit({ content: " ", embeds: [nomatches]})
            }
        }).catch(err => msg.edit(err.message))
    }
}
