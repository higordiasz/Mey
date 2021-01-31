const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')
const func = require("./functions")
const fetch = require('node-fetch')
let connectionDispatcher;

module.exports = {
    name: "radio",
    aliases: ["r"],
    description: "Tocar Radio",
    async execute(message, args, client) {
        const voiceChannel = message.member.voice.channel;
        let comando = args.shift()
        switch (comando) {

            case 'play':
                if (!voiceChannel) {
                    return message.channel.send("You need to be in a voice channel!");
                }
                const permissions = voiceChannel.permissionsFor(message.client.user);
                if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                    return message.channel.send("I don't have permissions to join and speak in that voice channel!");
                }
                if (!args[0]) {
                    func.radioplay(voiceChannel, message, client, "http://icepool.silvacast.com/GAYFM.mp3", 'Radio Padrão')
                } else {
                    if (!isNaN(args[0])) {
                        if (db.fetch(`radio.links.${args[0]}`)) {
                            let r = db.get(`radio.links.${args[0]}`)
                            func.radioplay(voiceChannel, message, client, r.l, r.n)
                        } else {
                            message.reply(`Por gentileza me informe o numero da rádio que deseja corretamente!! Use \`m.r list\` para ver as rádios disponiveis!!`)
                        }
                    } else {
                        message.reply(`Por gentileza me informe o numero da rádio que deseja corretamente!! Use \`m.r list\` para ver as rádios disponiveis!!`)
                    }
                    break;
                }

                break;

            case 'stop':
                func.radiostop(voiceChannel, message, client)
                break;

            case 'pause':
                func.radiopause(voiceChannel, message, client)
                break;
            case 'add':
                if ((message.author.id == config.OWNER) || (message.author.id == config.OWNER2)) {
                    let link = args[0]
                    let name = args[1]
                    args.shift()
                    args.shift()
                    let description = args.join(' ')
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Deseja realmente adicionar essa rádio ?`)
                        .addFields(
                            { name: `Link`, value: `${link}`, inline: true },
                            { name: `Nome`, value: `${name}`, inline: true },
                            { name: `Descrição`, value: `${description}`, inline: true }
                        )
                        .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
                        .setColor(config.COLOR)
                    let m = await message.channel.send(embed)
                    let reactions = [await client.emojis.cache.find(emoji => emoji.name === "confirmado"), await client.emojis.cache.find(emoji => emoji.name === "semauto")]
                    await m.react(reactions[0])
                    await m.react(reactions[1])
                    message.delete()
                    const filter = (reaction, user) => reactions.includes(reaction.emoji) && user.id === message.author.id;
                    const collector = await m.createReactionCollector(filter, { time: 30000, max: 1 }); // 30 Segundos
                    collector.on('collect', async (emoji) => {
                        switch (emoji._emoji.name) {
                            case reactions[0].name:
                                func.radioadd(link, name, description)
                                message.channel.send(`Rádio Adicionada!!`)
                                break;
                            case reactions[1].name:
                                break;
                        }
                    })
                    collector.on('end', () => {
                        try {
                            if (!m.deleted) return m.delete()
                        } catch (err) {
                            console.log('Erro no final')
                        }
                    })
                    break;
                } else {
                    message.reply('Apenas os meus criadores podem usar este comando!!')
                    break;
                }
            case 'list':
                if (db.fetch(`radio.links`)) {
                    let lista = db.get(`radio.links`)
                    let listembed = new Discord.MessageEmbed()
                    let radios = ''
                    let a = Object.keys(lista).map(key => lista[key]);
                    while (a.indexOf(null) > -1) {
                        a.shift(a.indexOf(null))
                    }
                    for (let i = 0; i < a.length; i++) {
                        radios += `**${a[i].c} - ${a[i].n}**\n Nome: ${a[i].n} \n Descrição: ${a[i].d}\n\n`
                    }
                    listembed.setTitle(`Lista de Radios Disponivel!!`)
                    listembed.setColor(config.COLOR)
                    listembed.setDescription(radios)
                    listembed.setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
                    listembed.setFooter(`Digite o comando | m.r play <numero> | para escutar uma radio especifica!!`)
                    message.channel.send(listembed)
                    break;
                } else {
                    message.reply(`Atualmente não possuo nenhuma rádio na lista!!`)
                    break;
                }
            case 'delete':
                if ((message.author.id == config.OWNER) || (message.author.id == config.OWNER2)) {
                    if (!isNaN(args[0])) {
                        let number = args[0]
                        if (db.fetch(`radio.links.${number}`)) {
                            let radio = db.get(`radio.links.${number}`)
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Deseja realmente deletar essa rádio ?`)
                                .addFields(
                                    { name: `Link`, value: `${radio.l}`, inline: true },
                                    { name: `Nome`, value: `${radio.n}`, inline: true },
                                    { name: `Descrição`, value: `${radio.d}`, inline: true }
                                )
                                .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
                                .setColor(config.COLOR)
                            let m = await message.channel.send(embed)
                            let reactions = [await client.emojis.cache.find(emoji => emoji.name === "confirmado"), await client.emojis.cache.find(emoji => emoji.name === "semauto")]
                            await m.react(reactions[0])
                            await m.react(reactions[1])
                            message.delete()
                            const filter = (reaction, user) => reactions.includes(reaction.emoji) && user.id === message.author.id;
                            const collector = await m.createReactionCollector(filter, { time: 30000, max: 1 }); // 30 Segundos
                            collector.on('collect', async (emoji) => {
                                switch (emoji._emoji.name) {
                                    case reactions[0].name:
                                        db.delete(`radio.links.${number}`)
                                        message.channel.send(`Rádio Deletada!!`)
                                        break;
                                    case reactions[1].name:
                                        break;
                                }
                            })
                            collector.on('end', () => {
                                try {
                                    if (!m.deleted) return m.delete()
                                } catch (err) {
                                    console.log('Erro no final')
                                }
                            })
                            break;
                        } else {
                            message.reply(`Me informe o numero da rádio corretamente!!`)
                        }
                    } else {
                        message.reply(`Apenas meus criadores tem direito de usar este comando!!`)
                    }
                    break;
                } else {
                    message.reply('Apenas os meus criadores podem usar este comando!!')
                    break;
                }
                break;
            default:
                message.reply(`Envie o comando corretamente`)
        }
    }
}
