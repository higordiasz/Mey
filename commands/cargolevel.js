const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')
const config = require('../json/config.json')
const func = require('./functions')

module.exports = {
    name: "levelrole",
    aliases: ["levelr"],
    description: "Define um channel onde a mey ira mandar os level up.",
    execute(msg, args, client) {
        if (!func.isADM(msg.member)) return msg.reply(`Seu poder não ultrapassou 8000!!!!`)
        if (!args[1]) return msg.reply(`Envie o comando corretamente \`m.levelrole <level> <Role>\``)
        let r = msg.mentions.roles.first().id
        if (!r) return msg.reply(`Mencione a role junto com o comando!! \`m.levelrole <Level> <Role>\``)
        let level = args[0]
        if (isNaN(level)) return msg.reply(`O primeiro valor deve ser o Level que deseja adicionar esse cargo!! \`m.levelrole <Level> <Role>\``)
        try {
            db.set(`server.${msg.guild.id}.levelsystem.${level}`, { role: r })
            msg.reply(`O cargo de ID **${r}** foi definido para o level **${level}**`)
            console.log(`Deu erro aqui: ${err}`)
        } catch (err) {
            console.log(`Erro: ${err}`)
        }
    }
}