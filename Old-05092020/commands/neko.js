const Discord = require('discord.js')
const fetch = require('node-fetch')
const config = require('../json/config.json')

module.exports = {
    name: "neko",
    aliases: ["nk"],
    description: "Mostra o profile do usuario desejado.",
    async execute(msg, args, client) {
        const data = await fetch('https://nekos.life/api/v2/img/neko')
            .then(res => res.json())
            .then(json => json);
        const url = data.url;
        if (!url) return msg.channel.send('There seems to be a problem...');
        const embed = new Discord.MessageEmbed()
            .setColor(config.COLOR)
            .setTitle('Niko Niko Ni!')
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
            .setURL(url)
            .setDescription('Aqui está sua Neko aleatória!')
            .setImage(url)
            .setFooter(client.user.tag, client.user.displayAvatarURL).setTimestamp();
        msg.channel.send(embed);
    }
}