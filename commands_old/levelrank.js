const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')
const config = require('../json/config.json')
const func = require('./functions')
const jimp = require('../jimp/jProfile')

module.exports = {
    name: "rank",
    aliases: ["levelr", "levelrank"],
    description: "Mostra o Rank de nivel.",
    async execute(msg, args, client) {
        function compare(a, b) {
            if (a.xp < b.xp) {
                return 1;
            } else {
                if (a.xp > b.xp) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
        let usuarios = db.get(`server.${msg.guild.id}.levelsystem.users`)
        let a = Object.keys(usuarios).map(key => usuarios[key]);
        a.sort(compare)
        if (a.length < 5) {
            msg.reply(`Para usar o comando \`m.rank\` deve ter ao menos 5 usuário com level no servidor!!`)
        } else {
            let m = await msg.reply(`Estou preparando o rank...`)
            let primeiro = await msg.guild.members.fetch(a[0].id)
            console.log(primeiro)
            let segundo = await msg.guild.members.fetch(a[1].id)
            let terceiro = await msg.guild.members.fetch(a[2].id)
            let quarto = await msg.guild.members.fetch(a[3].id)
            let quinto = await msg.guild.members.fetch(a[4].id)
            let pri = {
                "avatar": primeiro.user.displayAvatarURL({ format: 'png' }),
                "tag": primeiro.user.tag,
                "level": a[0].level,
                "xp": a[0].xp
            }
            let seg = {
                "avatar": segundo.user.displayAvatarURL({ format: 'png' }),
                "tag": segundo.user.tag,
                "level": a[1].level,
                "xp": a[1].xp
            }
            let ter = {
                "avatar": terceiro.user.displayAvatarURL({ format: 'png' }),
                "tag": terceiro.user.tag,
                "level": a[2].level,
                "xp": a[2].xp
            }
            let qua = {
                "avatar": quarto.user.displayAvatarURL({ format: 'png' }),
                "tag": quarto.user.tag,
                "level": a[3].level,
                "xp": a[3].xp
            }
            let qui = {
                "avatar": quinto.user.displayAvatarURL({ format: 'png' }),
                "tag": quinto.user.tag,
                "level": a[4].level,
                "xp": a[4].xp
            }
            jimp.rank(client, msg, pri, seg, ter, qua, qui, m)
        }
    }
}