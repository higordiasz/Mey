const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')
const config = require('../json/config.json')

module.exports = {
    name: "discord",
    aliases: ["dc", "disc"],
    description: "Mande o discord de suporte no channel",
    async execute(msg, args, client) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Link para meu Servidor')
            .setColor(config.COLOR)
            .setAuthor('Mey System', client.user.displayAvatarURL({ dynamic: true }))
            .setImage('https://i.imgur.com/gwboy4k.gif')
            .setDescription("Entre no meu servidor de suporte!! \n\n[Convite para o servidor](https://discord.gg/4EfwvnR)\n\n")
            .setFooter('Meus Criadores: Dias - Wiul - Loli')
        msg.channel.send(embed)
    }
}