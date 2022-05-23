
  
## 📑 Short Feature
- [x] Music System
- [x] Playlists System
- [x] Premium System
- [x] Setup Request System
- [x] Multi Language
- [x] SlashCommand
- [x] ContextMenus
- [x] Custom Filters
- [x] Easy to use

## 🎶 Support Source
- [x] Youtube
- [x] SoundCloud
- [x] Spotify
- [x] Deezer
- [x] Facebook 
- [x] Twitch
- [x] Apple
- [x] Bandcamp
- [x] Vimeo
- [x] Https (Radio)

<details><summary>📎 Requirements [CLICK ME]</summary>
<p>

## 📎 Requirements

1. Node.js Version 16.6.0+ **[Download](https://nodejs.org/en/download/)**
2. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
3. LavaLink **[Guide](https://github.com/freyacodes/lavalink)** (i use this development version [Download](https://ci.fredboat.com/repository/downloadAll/Lavalink_Build/9311:id/artifacts.zip) )
4. MongoDB **[Download](https://www.mongodb.com/try/download/community)** (Download & install = Finish!)

## 🛑 Super Requirements 

Java 11-13 **[Download JDK13](http://www.mediafire.com/file/m6gk7aoq96db8g0/file)** (i use this version) for LAVALINK!

</p>
</details>

## 📚 Installation

```
git clone https://github.com/Adivise/NanoSpacePlus
cd NanoSpacePlus
npm install
```

<details><summary>📄 Configuration [CLICK ME]</summary>
<p>

## 📄 Configuration

> **OPTION 1️⃣**
Copy or Rename `.env.example` to `.env` and fill out the values:

```.env
# Bot
TOKEN=REPLACE_HERE
NP_REALTIME=false
LEAVE_TIMEOUT=120000
LANGUAGE=en
EMBED_COLOR=#000001
# Devloper
OWNER_ID=REPLACE_HERE
# Database
MONGO_URI=mongodb://127.0.0.1:27017/nanospace
LIMIT_TRACK=50
LIMIT_PLAYLIST=10
# Lavalink
NODE_HOST=localhost
NODE_PORT=5555
NODE_PASSWORD=123456
```

> **OPTION 2️⃣**
Go to folder `settings` edit `config.js` and you can fill out the values:

```js
require("dotenv").config();
const { resolve } = require("path");
module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    PREFIX: process.env.PREFIX || "#", //<= default is #  // bot prefix
    EMBED_COLOR: process.env.EMBED_COLOR || "#000001", //<= default is "#000001"
    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your owner discord id example: "515490955801919488"
    NP_REALTIME: process.env.NP_REALTIME || "BOOLEAN", // "true" = realtime, "false" = not realtime :3 // WARNING: on set to "true" = laggy and bot will ratelimit if you have a lot of servers
    LEAVE_TIMEOUT: parseInt(process.env.LEAVE_TIMEOUT || "120000"), // leave timeout default "120000" = 2 minutes // 1000 = 1 seconds
    LANGUAGE: {
      defaultLocale: process.env.LANGUAGE || "en", // "en" = default language
      directory: resolve("languages"), // <= location of language
    },
    DEV_ID: [], // if you want to use command bot only, you can put your id here example: ["123456789", "123456789"]
    MONGO_URI: process.env.MONGO_URI || "YOUR_MONGO_URI", // your mongo uri
    LIMIT_TRACK: parseInt(process.env.LIMIT_TRACK || "50"),  //<= dafault is "50" // limit track in playlist
    LIMIT_PLAYLIST: parseInt(process.env.LIMIT_PLAYLIST || "10"), //<= default is "10" // limit can create playlist
    NODES: [
      { 
        host: process.env.NODE_HOST || "localhost",
        port: parseInt(process.env.NODE_PORT || "5555"),
        password: process.env.NODE_PASSWORD || "123456",
      } 
    ],
}
```
After installation or finishes all you can use `node .` to start the bot. or `Run Start.bat`

</p>
</details>

<details><summary>🔩 Features & Commands [CLICK ME]</summary>
<p>

## 🔩 Features & Commands

> Note: The default prefix is 'd!'
🎶 **Music Commands!** 

- Play (d!play [song/url])
- Nowplaying (d!nowplaying)
- Queue (d!queue [page])
- Repeat (d!loop type [current, all])
- Loopqueue (d!loopall)
- Shuffle (d!shuffle)
- Volume control (d!volume [10 - 100])
- Pause (d!pause)
- Resume (d!resume)
- Skip (d!skip)
- Skipto (d!skipto [position])
- Clear (d!clear)
- Join (d!join)
- Leave (d!leave)
- Forward (d!forward [second])
- Seek (d!seek [second])
- Rewind (d!rewind [second])
- Replay (d!replay)
- Search (d!search [songname])
- Previous (d!previous)
- Autoplay (d!autoplay)
- Radio (d!radio)

⏺ **Filter Commands!**
- Bass (d!bass)
- Superbass (d!superbass)
- Pop (d!pop)
- Treblebass (d!treblebass)
- Soft (d!soft)
- Earrape (d!earrape)
- Equalizer (d!equalizer [14 bands])
- Speed (d!speed [amount])
- Picth (d!pitch [amount])
- Vaporwave (d!vaporwave)
- Nightcore (d!nightcore)
- Bassboost (d!bassboost [-10 - 10])
- Rate (d!rate)
- Reset (d!reset)
- 3d (d!3d)
- China (d!china)
- Chipmunk (d!chipmunk)
- Darthvader (d!darthvader)
- DoubleTime (d!doubletime)
- SlowMotion (d!slowmotion)
- Tremolo (d!tremolo)
- Vibrate (d!vibrate)
- Vibrato (d!vibrato)
	
📑 **Utilities Commands!**
- Restart (d!restart) // (OWNER ONLY)

</p>
</details>
