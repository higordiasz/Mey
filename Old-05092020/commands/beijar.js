const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')
const config = require('../json/config.json')

module.exports = {
    name: "beijar",
    aliases: ["beijo", "bj"],
    description: "Ativa o log de Voice no servidor.",
    async execute(msg, args, client) {
        let userm = msg.mentions.users.first();
        if (!userm) {
            return message.reply('lembre-se de mencionar um usuário válido para beijar!');
        }
        const data = await fetch('https://nekos.life/api/v2/img/kiss')
            .then(res => res.json())
            .then(json => json);
        const url = data.url;
        let avatar = msg.author.displayAvatarURL({ dynamic: true });
        let embedreturn = new Discord.MessageEmbed()
            .setTitle('Aceita me beijar ?')
            .setColor(config.COLOR)
            .setDescription(`O usuario ${msg.author} deseja te beijar, ${userm}.\nVoce aceita ?\nReaja com  :kissing_heart:  para aceitar ou  :rage:  para recusar.`)
            .setThumbnail(avatar)
            .setAuthor(msg.author.tag, avatar);
        let messagecheck = await msg.channel.send(embedreturn);
        (await messagecheck).react('😘');
        (await messagecheck).react('😡');

        const reactions = ['😘', '😡'];

        const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === userm.id;

        const collector = messagecheck.createReactionCollector(filter, { time: 15000 }); // 30 Segundos

        collector.on('end', async (emoji) => {
            if (!messagecheck.deleted) {
                const embed3 = new Discord.MessageEmbed()
                    .setTitle('Nào respondido')
                    .setColor(config.COLOR)
                    .setDescription(`${userm} nào respondeu o beijo a tempo!.`)
                    .setTimestamp()
                    .setThumbnail(avatar)
                    .setFooter('nào respondeu!')
                    .setAuthor(msg.author.tag, avatar);
                await msg.channel.send(embed3);
                messagecheck.delete();
                msg.delete();
            }
        })

        collector.on('collect', async (emoji) => {
            switch (emoji._emoji.name) {
                case '😘':
                    const embed1 = new Discord.MessageEmbed()
                        .setTitle('Beijo')
                        .setColor(config.COLOR)
                        .setDescription(`${msg.author} acaba de beijar ${userm}`)
                        .setImage(url)
                        .setTimestamp()
                        .setThumbnail(avatar)
                        .setFooter('Kissu kissu kissu')
                        .setAuthor(msg.author.tag, avatar);
                    await msg.channel.send(embed1);
                    messagecheck.delete();
                    msg.delete();
                    break;

                case '😡':
                    const embed2 = new Discord.MessageEmbed()
                        .setTitle('Recusou')
                        .setColor(config.COLOR)
                        .setDescription(`${msg.author} acaba de recusar um beijo de ${userm}`)
                        //.setImage(url)
                        .setTimestamp()
                        .setThumbnail(avatar)
                        .setFooter('recusou o beijo!')
                        .setAuthor(msg.author.tag, avatar);
                    await msg.channel.send(embed2);
                    messagecheck.delete();
                    msg.delete();
                    break;

                default:
                    break;
            }
        });
    }
}