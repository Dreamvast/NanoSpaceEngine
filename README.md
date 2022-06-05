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
git clone https://github.com/Dreamvast/Dreamvast/
cd Dreamvast
npm install
```

<details><summary>📄 Configuration [CLICK ME]</summary>
<p>

## 📄 Configuration

> **OPTION 1️⃣**
Copy or Rename `.env.example` to `.env` and fill out the values:

```.env
# Bot
TOKEN=put your bot token here
LEAVE_TIMEOUT=put your timeout value here (must be a number and 1000 = 1 seconds)
PREFIX=put your prefix here
OWNER_ID=put your id here (example: 898728768791789628)

# Lavalink
NODE_HOST=put your lavalink ip here
NODE_PORT=put your lavalink port here
NODE_PASSWORD=put your lavalink password here

# Spotify
SPOTIFY_ID=put your spotify id here
SPOTIFY_SECRET=put your spotify secret here

# Slash
CLIENT_ID=Put your client id here
GUILD_ID=Put your guild (server) id here # You can delete it or leave it alone

# Top.gg
TOPGG_TOKEN=put your top.gg token here (required)

# Database
MONGO_URI=put your mongo uri here
```

> **OPTION 2️⃣**
Go to folder `settings` edit `config.js` and you can fill out the values:

```js
require("dotenv").config();
const { resolve } = require("path");
module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    PREFIX: process.env.PREFIX || "#", //<= default is #  // bot prefix
    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your owner discord id example: "515490955801919488"
    LEAVE_TIMEOUT: parseInt(process.env.LEAVE_TIMEOUT || "120000"), // leave timeout default "120000" = 2 minutes // 1000 = 1 seconds
    MONGO_URI: process.env.MONGO_URI || "YOUR_MONGO_URI", // your mongo uri
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
<details><summary>📚 Installation on Deploy Platform (Self Hosting 24/7) [CLICK ME]</summary>
<p>
	
# Creating a discord bot account

1. [Click this](https://discordpy.readthedocs.io/en/stable/discord.html) and follow the steps in it
2. Make sure you enable PRESENCE INTENT, SERVER MEMBERS INTENT and MESSAGE CONTENT INTENT

## Click one of these 3 link.

[1. Deploy Dreamvast on Railway](https://railway.app/new/template/O9uSe-?referralCode=gx5tSK) (With Railway, you just follow the step in Railway)
	
[2. Deploy Dreamvast on Replit](https://replit.com/@XeonE52680v3/Dreamvast)
### If you are deploy in replit, follow all this step bellow
1. If you have clicked the "Deploy Dreamvast on Replit", click on "Fork repl"
2. When you cloned your repl, click on "Secrets (Enviroment Variables)"
3. At the enviroment area, scroll down and click on "Open raw editor"
4. At the editor, copy this text **(Remember to change what it asks for in the text.)**
```
{
	"TOKEN": "put your bot token here",
	"LEAVE_TIMEOUT": "put your timeout value here (must be a number and 1000 = 1 seconds)",
	"PREFIX": "put your prefix here",
	"OWNER_ID": "put your id here (example: 898728768791789628)",
	"NODE_HOST": "lavalink.darrenofficial.com",
	"NODE_PORT": "80",
	"NODE_PASSWORD": "FreeLava",
	"SPOTIFY_ID": "put your spotify id here",
	"SPOTIFY_SECRET": "put your spotify secret here",
	"CLIENT_ID": "Put your client id here",
	"GUILD_ID": "Put your guild (server) id here",
	"TOPGG_TOKEN": "put your top.gg token here (required for autoplay command)",
	"MONGO_URI": "put your mongo uri here",
	"TOGGLE_SLASH": "(put enable or disable here to use or not use slash)"
}
```
5. After finish, click on save.
6. Click on Run and enjoy the bot!
</p>
</details>
