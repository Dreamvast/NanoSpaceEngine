//Main Package
const { Client, Intents, Collection } = require("discord.js");
const { Manager } = require("erela.js");
const Deezer = require('./plugins/Deezer');
const AppleMusic  = require("erela.js-apple");
const Facebook = require("erela.js-facebook");
const path = require("path");
const Spotify = require("erela.js-spotify");
//Top.gg
const logger = require('./plugins/logger')
const DBL = require("top.gg");
const dbl = new DBL(process.env.TOPGG_TOKEN, Client);
dbl.on('posted', () => {
    logger.info('Server count posted!');
})

dbl.on('error', e => {
    logger.info(`Oops! ${e}`);
})
//Main Code
class MainClient extends Client {
     constructor() {
        super({
            shards: "auto",
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_VOICE_STATES,
            ]
        });

    this.config = require("./plugins/config.js");
    this.prefix = this.config.PREFIX;
    if(!this.token) this.token = this.config.TOKEN;
    const clientID = this.config.SPOTIFY_ID
    const clientSecret = this.config.SPOTIFY_SECRET

    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error));

    const client = this;

    this.manager = new Manager({
      nodes: this.config.NODES,
      autoPlay: true,
      plugins: [
        new Deezer(),
        new AppleMusic(),
        new Spotify({
          clientID,
          clientSecret
        }),
        new Facebook()
      ],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    });

    ["aliases", "slash", "commands", "premiums"].forEach(x => client[x] = new Collection());
    ["loadCommand", "loadEvent", "loadPlayer", "loadDatabase"].forEach(x => require(`./handlers/${x}`)(client));

    }
        connect() {
        return super.login(this.token);
    };
};
module.exports = MainClient;