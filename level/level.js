const Discord = require('discord.js')
const prof = require('../jimp/jProfile.js')
const db = require('quick.db')

module.exports = {
    name: "level",
    aliases: ["lv"],
    description: "Mostra o profile do usuario desejado.",
    execute(msg, args, client) {
        let user = msg.mentions.users.first() || msg.author
        if (!db.get(`server.${msg.guild.id}.levelsystem.users.${user.id}`)) return msg.reply('Este usuario não possui level ainda.')
        let userinfo = db.get(`server.${msg.guild.id}.levelsystem.users.${user.id}`)
        prof.level(client, msg, userinfo.level, userinfo.xp, user)
    }
}