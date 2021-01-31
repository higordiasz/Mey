const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')
const config = require('../json/config.json')

module.exports = {
    name: "link",
    aliases: ["lk", "invite", "convite"],
    description: "Mande o link do meu convite",
    async execute(msg, args, client) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Link me Convidar! >w<')
            .setColor(config.COLOR)
            .setAuthor('Mey System', client.user.displayAvatarURL({ dynamic: true }))
            .setImage('https://i.imgur.com/gwboy4k.gif')
            .setDescription("Me convide para o seu servidor!! \n\n[Meu convite](https://discord.com/oauth2/authorize?=&client_id=735452795343208458&scope=bot&permissions=8)\n\n")
            .setFooter('Meus Criadores: Dias - Wiul')
        msg.channel.send(embed)
    }
}