const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    config: {
        name: "autoplay",
        aliases: ["ap"],
        description: "Auto play music in voice channel!",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message, args, user) => {
      //Library declaration.
      const fetch = require("node-fetch"); // import node-fetch module
      const msg = await message.channel.send(`**Loading please wait...**`);

      const botId = client.user.id; // get the client (bot) id
      const uId = message.author.id; // get the author id

      const url = `https://top.gg/api/bots/${botId}/check?userId=${uId}`; // api endpoint
      this.config = require("../../plugins/config.js");
      const topgg = this.config.TOPGG_TOKEN

      //Main Code
      fetch(url, { method: "GET", headers: { Authorization: `${topgg}` }})
          .then((res) => res.text())
          .then(async (json) => {
            var isVoted = JSON.parse(json).voted;
            if (isVoted === 0) {
              const NotVoted = new MessageEmbed()
              .setTitle("❎ | You haven't voted yet")
              .setDescription("To use this command, you have to vote this bot!")
              .setColor(client.color)
              const row = new MessageActionRow()
                  .addComponents(
                    new MessageButton()
                      .setLabel("Click here to vote!")
                      .setStyle("LINK")
                      .setURL("https://top.gg/bot/958642964018642944")
                  )
                  .addComponents(
                    new MessageButton()
                      .setLabel("Invite Me")
                      .setStyle("LINK")
                      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
                  )
              return msg.edit({ content: " ", embeds: [NotVoted], components: [row] });
            }
            const player = client.manager.get(message.guild.id);
            if (!player) return msg.edit("No song/s currently playing with in this guild.");

            const autoplay = player.get("autoplay");

            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.");

            try {
            if (autoplay === true) {

                await player.set("autoplay", false);
                await player.queue.clear();

                const off = new MessageEmbed()
                .setDescription("\`📻\` | **Autoplay has been:** `Deactivated`")
                .setColor(client.color);

                msg.edit({ content: " ", embeds: [off] });
            } else {

                const identifier = player.queue.current.identifier;
                const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
                const res = await player.search(search, message.author);

                await player.set("autoplay", true);
                await player.set("requester", message.author);
                await player.set("identifier", identifier);
                await player.queue.add(res.tracks[1]);

                const on = new MessageEmbed()
                .setDescription("\`📻\` | **Autoplay has been:** `Activated`")
                .setColor(client.color);

                msg.edit({ content: " ", embeds: [on] });
            }
        } catch (err) {
            console.log(err)
            msg.edit({ content: "Something went wrong, try again later." })
            }
      });
  }
};
