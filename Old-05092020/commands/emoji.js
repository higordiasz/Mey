const Discord = require("discord.js")
const { parse } = require("twemoji-parser")
const { MessageEmbed } = require("discord.js")
const config = require('../json/config.json')
const Color = config.COLOR

module.exports = {
    name: "emoji",
    aliases: ["em"],
    description: "Mostra o emoji desejado.",
    async execute(msg, args, client) {
        const emoji = args[0];
        if (!emoji) return message.channel.send(`Por favor me de um emoji!`);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
                customemoji.animated ? "gif" : "png"
                }`;

            const Added = new MessageEmbed()
                .setTitle(`Emoji`)
                .setColor(`${Color}`)
                .addField('Link:', `[Click Me](${Link})`)
                .setImage(Link
                );
            return message.channel.send(Added);
        } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0])
                return message.channel.send(`Me mostre um emoji valido!`);
            message.channel.send(
                `Nâo pode usar emoji normal, apenas os adicionados no Servidor!!`
            );
        }
    }
}