const Discord = require('discord.js')
const config = require('../json/config.json')

module.exports = {
    name: "aitem",
    aliases: ["at", "ait"],
    description: "Ai tem ?",
    async execute(msg, args, client) {
        let userm = msg.mentions.users.first();
        if (!userm) return message.reply('lembre-se de mencionar um usuário válido para beijar!');
        args.shift()
        let ait = args.join(" ")
        if (!ait) return msg.reply(`Me informe algo para perguntar!!`)
        let avatar = userm.displayAvatarURL({ dynamic: true });
        const embed = new Discord.MessageEmbed()
            .setTitle('Ai Tem?')
            .setColor(config.COLOR)
            .setDescription(`${userm}, ai onde você mora tem **${ait}** ?`)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter(msg.author.tag)
        msg.channel.send(embed)
        msg.delete()
    }
}