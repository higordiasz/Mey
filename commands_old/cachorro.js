const Discord = require('discord.js')
const fetch = require('node-fetch')
const config = require('../json/config.json')

module.exports = {
    name: "cachorro",
    aliases: ["dog", "doguinho"],
    description: "Gif aleatório de cachorro.",
    async execute(msg, args, client) {
        const data = await fetch('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(json => json);
        const url = data.message;
        let avatar = msg.author.displayAvatarURL({ dynamic: true });


        const embed = new Discord.MessageEmbed()
            .setTitle('Cachorro')
            .setColor(config.COLOR)
            .setImage(url)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('Au Au Au!')
            .setAuthor(msg.author.tag, avatar);
        await msg.channel.send(embed);
    }
}