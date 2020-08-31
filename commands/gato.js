const Discord = require('discord.js')
const fetch = require('node-fetch')
const config = require('../json/config.json')

module.exports = {
    name: "gato",
    aliases: ["cat", "gatinho"],
    description: "Gif aleatório de cachorro.",
    async execute(msg, args, client) {
        const data = await fetch('https://api.thecatapi.com/v1/images/search')
            .then(res => res.json())
            .then(json => json);
        const url = data[0].url;
        let avatar = msg.author.displayAvatarURL({ format: 'png' });


        const embed = new Discord.MessageEmbed()
            .setTitle('Gato')
            .setColor(config.COLOR)
            .setImage(url)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('Meow Meow Meow!')
            .setAuthor(msg.author.tag, avatar);
        await msg.channel.send(embed);
    }
}