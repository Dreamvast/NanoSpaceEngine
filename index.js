const MainClient = require("./manager");
const client = new MainClient();
require('./plugins/registerSlash.js')
client.connect()
module.exports = client; 