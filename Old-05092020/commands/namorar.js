const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')
const func = require("./functions")
const fetch = require('node-fetch')

module.exports = {
    name: "namoro",
    aliases: ["namorar", "nm"],
    description: "Dar um console.log na db de monstros",
    async execute(msg, args, client) {
        let userm = msg.mentions.users.first();
        if (!userm) return msg.reply('Marque a pessoa que deseja pedir em namoro!')
        if (db.get(`user.${msg.author.id}.namoro`) != null) return msg.reply('Desculpe. Mas vc ja esta namorando!!!')
        if (db.get(`user.${userm.id}.namoro`) != null) return msg.channel.send(`O usuario ${userm} ja esta namorando!!`)
        let embed = new Discord.MessageEmbed()
            .setAuthor('Sera um novo casal?')
            .setImage('https://i.imgur.com/4SEjGme.gif')
            .setThumbnail('https://i.imgur.com/tvwvwhX.png')
            .setDescription(`${userm} você aceita namorar com ${msg.author} ?? \n\n Reaja com um dos emojis abaixo para responder!!`)
            .addFields(
                { name: 'SIM!!', value: `😘`, inline: true },
                { name: 'NÃO!!', value: `😡`, inline: true }
            )
            .setColor(config.COLOR);

        let messagecheck = await msg.channel.send(embed);
        await messagecheck.react('😘');
        await messagecheck.react('😡');

        const reactions = ['😘', '😡'];

        const data = await fetch('https://nekos.life/api/v2/img/kiss')
            .then(res => res.json())
            .then(json => json);
        const url = data.url;

        const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === userm.id;

        const collector = messagecheck.createReactionCollector(filter, { time: 15000 }); // 30 Segundos

        collector.on('end', async (emoji) => {
            if (!messagecheck.deleted) {
                const embed3 = new Discord.MessageEmbed()
                    .setTitle('Nào respondido')
                    .setColor(config.COLOR)
                    .setDescription(`${userm} nào respondeu o pedido a tempo!.`)
                    .setTimestamp()
                    .setFooter('nào respondeu!')
                await msg.channel.send(embed3);
                messagecheck.delete();
                msg.delete();
            }
        })

        collector.on('collect', async (emoji) => {
            switch (emoji._emoji.name) {
                case '😘':
                    const embed1 = new Discord.MessageEmbed()
                        .setTitle('Pedido Aceito!!')
                        .setColor(config.COLOR)
                        .setDescription(`${userm} acaba de aceitar namorar com ${msg.author}`)
                        .setImage(url)
                        .setTimestamp()
                        .setFooter('Um novo casal se formou!! >w<')
                    await msg.channel.send(embed1);
                    messagecheck.delete();
                    msg.delete();
                    db.set(`user.${msg.author.id}.namoro`, userm.id)
                    db.set(`user.${userm.id}.namoro`, msg.author.id)
                    break;

                case '😡':
                    const embed2 = new Discord.MessageEmbed()
                        .setTitle('Recusou')
                        .setColor(config.COLOR)
                        .setDescription(`${msg.author} acaba de levar um fora do usuario: ${userm}`)
                        .setTimestamp()
                        .setFooter('Recusou o pedido!!!')
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