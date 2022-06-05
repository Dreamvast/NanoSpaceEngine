const slash = process.env.TOGGLE_SLASH
//Express server
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT)
//Slash command
if (slash === "enable"){
	require("./plugins/slash.js")
} else if (slash === "disable"){
	require("./plugins/noSlash.js")
}


