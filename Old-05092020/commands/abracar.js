const Discord = require('discord.js')
const fetch = require('node-fetch')
const config = require('../json/config.json')

module.exports = {
    name: "abraçar",
    aliases: ["abraço", "ab"],
    description: "Abraça a pessoa selecionada.",
    async execute(msg, args, client) {
        if (!msg.mentions.users.first()) return msg.reply('lembre de marcar quem deseja abraçar!!');
        const data = await fetch('https://nekos.life/api/v2/img/hug')
            .then(res => res.json())
            .then(json => json);
        const url = data.url;
        let avatar = msg.author.displayAvatarURL({ dynamic: true });
        let user = msg.mentions.users.first();


        const embed = new Discord.MessageEmbed()
            .setTitle('Abraço')
            .setColor(config.COLOR)
            .setDescription(`${msg.author} abraçou ${user}!.`)
            .setImage(url)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('Abraçou!')
            .setAuthor(msg.author.tag, avatar);
        await msg.channel.send(embed);
        msg.delete();
    }
}