const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')
const config = require('../json/config.json')

module.exports = {
    name: "setlevelup",
    aliases: ["setcl"],
    description: "Define um channel onde a mey ira mandar os level up.",
    async execute(msg, args, client) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return;
        let valor = msg.mentions.channels.first() != undefined ? msg.mentions.channels.first().id : msg.channel.id
        db.set(`server.${msg.guild.id}.levelsystem.chatup`, valor)
        msg.reply(`Canal para mandar mensagens de \`Level UP\` setado!`)
    }
}