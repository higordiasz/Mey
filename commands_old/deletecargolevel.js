const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')
const config = require('../json/config.json')
const func = require('./functions')

module.exports = {
    name: "leveldelete",
    aliases: ["levelrd", "leveld"],
    description: "Delete um alto role do level system.",
    execute(msg, args, client) {
        if (!func.isADM(msg.member)) return msg.reply(`Seu poder não ultrapassou 8000!!!!`)
        if (!args[0]) return msg.reply(`Envie o comando corretamente \`m.leveldelete <level>\``)
        let level = args[0]
        if (isNaN(level)) return msg.reply(`O valor do cargo deve ser um numero!! \`m.levelrole <Level>\``)
        try {
            db.delete(`server.${msg.guild.id}.levelsystem.${level}`)
            msg.reply(`O cargo do level **${level}** foi deletado do banco de dados!!`)
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
    }
}