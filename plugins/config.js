require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN,
    PREFIX: process.env.PREFIX || "#",
    EMBED_COLOR: process.env.EMBED_COLOR,
    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID",

    LEAVE_TIMEOUT: parseInt(process.env.LEAVE_TIMEOUT || "120000"),

    NODES: [
      { 
        host: process.env.NODE_HOST,
        port: parseInt(process.env.NODE_PORT),
        password: process.env.NODE_PASSWORD,
      } 
    ],
    SPOTIFY_ID: process.env.SPOTIFY_ID,
    SPOTIFY_SECRET: process.env.SPOTIFY_SECRET,
    TOPGG_TOKEN: process.env.TOPGG_TOKEN,
    MONGO_URI: process.env.MONGO_URI,
}
