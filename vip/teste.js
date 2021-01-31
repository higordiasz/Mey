const Discord = require('discord.js')
const config = require('../json/config.json')

module.exports = {
    name: "teste",
    aliases: [],
    description: "Enviarei todos os servidores em que me encontro no channel.",
    execute(msg, args, client) {
        console.log('entrei')
    }
}