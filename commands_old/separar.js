const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')
const func = require('./functions')

module.exports = {
    name: "separar",
    aliases: ["divorcio"],
    description: "Separ do namoro Atual.",
    async execute(msg, args, client) {
        if (await db.get(`user.${msg.author.id}.namoro`) == null) return msg.reply('Desculpe. Mas vc não esta namorando!!!')
        let id = await db.get(`user.${msg.author.id}.namoro`)
        let namorada = await msg.guild.members.fetch(`${id}`)
        db.delete(`user.${msg.author.id}.namoro`)
        db.delete(`user.${namorada.user.id}.namoro`)
        let embed = new Discord.MessageEmbed()
            .setAuthor('Uma triste despediada!!')
            .setImage('https://i.imgur.com/tjo1JrV.gif')
            .setDescription(`${msg.author} acaba de se separar do(a) ${namorada.user} !!`)
            .setColor(config.COLOR);
        msg.channel.send(embed)
    }
}