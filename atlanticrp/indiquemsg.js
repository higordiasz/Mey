const Discord = require('discord.js')
const { Reprovado, Aprovado } = require('../controller/wl-controller');
const { OWNER, COLOR } = require('../json/config.json')

module.exports = {
    name: "indmsg",
    aliases: ["imsg"],
    description: "Indique e ganhe",
    async execute(msg, args, client) {
        let avatar = client.user.displayAvatarURL({ format: 'png' });
        if(msg.author.id == OWNER) {
            let ember = new Discord.MessageEmbed()
            .setTitle("Indicação - Atlantic City RP")
            .setDescription("**Convide 15 amigos e ganhe uma incrivel kTm :**")
            .setFooter("Convide amigos e ganhe")
            .setColor(COLOR)
            .setThumbnail(avatar)
            .setImage('https://i.imgur.com/wRNsCol.jpg');
            await msg.channel.send(ember);
        }
    }
}