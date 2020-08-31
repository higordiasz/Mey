const Discord = require('discord.js')
const prof = require('../jimp/jProfile.js')
const db = require('quick.db')

module.exports = {
    name: "profile",
    aliases: ["p"],
    description: "Mostra o profile do usuario desejado.",
    execute(msg, args, client) {
        let user = msg.mentions.users.first() || msg.author
        if (!db.get(`user_${user.id}`)) return msg.reply('Este usuario não possui um profile ainda.').then(msg => {

        })
        let userinfo = db.get(`user_${user.id}`)
        let val = {
            "ataque": userinfo.ataque,
            "defesa": userinfo.defesa,
            "speed": userinfo.speed,
            "magia": userinfo.magia,
            "level": userinfo.level,
            "money": userinfo.money,
            "vida_m": userinfo.vida,
            "vida_a": userinfo.v_atual,
            "fundo": userinfo.ficha
        }
        prof.profile(client, msg, val, user)
    }
}