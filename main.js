const { Client } = require('discord.js')
const WS = require('./ws/ws')

var phpExpress = require('php-express')({
    binPath: 'php'
});

var client = new Client()

var ws = new WS(process.env.WEBTOKEN, process.env.PORT, client)

console.log("Created By Aquatic Development Team (https://aquaticdevelopment.xyz)")
