const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')
const func = require("../commands/functions")
const moment = require(`moment`)

module.exports = {
    name: "hunt",
    aliases: ["caçar", "caça"],
    description: "Saia para Caçar",
    async execute(msg, args, client) {
        msg.delete()
        let user = msg.author
        let letcommand = db.get(`rpg.characters.players.${user.id}.cooldowns.hunt`) || 0
        if (letcommand == 0) {
            let personagem = db.get(`rpg.characters.players.${msg.author.id}`)
            if (personagem.v_atual < 5) return msg.reply(`Você não possui vida suficient. Sua Vida: ${personagem.v_atual} \n Va se recuperar primeiro!!`)
            let monster = func.returnmonster(personagem.level)
            let embed = new Discord.MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
                .setThumbnail(monster.image)
                .setDescription(`Você deu de cara com um(a): **${monster.nome}**\n Reaja com 🗡️ para lutar ou 🏃‍♂️ para fugir.`)
                .addFields(
                    { name: 'LVL', value: `${monster.level}`, inline: true },
                    { name: 'XP', value: `${monster.xp}`, inline: true },
                    { name: 'Vida', value: `${monster.vida}`, inline: true },
                    { name: 'ATK', value: `${monster.ataque}`, inline: true },
                    { name: 'DEF', value: `${monster.defesa}`, inline: true },
                    { name: 'Speed', value: `${monster.speed}`, inline: true }
                )
                .setColor(config.COLOR)
            let m = await msg.reply(embed)
            let reactions = ['🗡️', '🏃‍♂️']
            await m.react(reactions[0])
            await m.react(reactions[1])
            let respondeu = false;

            const filter = (reaction, u) => reactions.includes(reaction.emoji.name) && u.id === user.id;
            const collector = m.createReactionCollector(filter, { time: 30000, max: 1 }); // 30 Segundos
            collector.on('end', async (emoji) => {
                if (!respondeu) {
                    const embed3 = new Discord.MessageEmbed()
                        .setTitle('Acabou o tempo')
                        .setColor(config.COLOR)
                        .setDescription(`${user} nào respondeu a tempo!. O comando entro em coldown!!`)
                        .setTimestamp()
                        .setFooter('acabou o tempo para caçar!')
                    await msg.channel.send(embed3);
                    m.delete();
                    msg.delete();
                }
            })

            collector.on('collect', async (emoji) => {
                switch (emoji._emoji.name) {
                    case reactions[0]:
                        respondeu = true;
                        if (respondeu) {
                            func.huntbatle(monster, personagem, user, msg, 0)
                            await m.delete();
                        }
                        break;
                    case reactions[1]:
                        respondeu = true;
                        if (respondeu) {
                            func.huntleave(monster, personagem, user, msg)
                            await m.delete();
                        }
                        break;
                    default:
                        break;
                }
            });
        } else {
            let d_atual = new moment()
            let dif = moment.duration(d_atual.diff(letcommand))
            if (dif._milliseconds > 120000) {
                db.delete(`rpg.characters.players.${user.id}.cooldowns.hunt`)
                let personagem = db.get(`rpg.characters.players.${msg.author.id}`)
                if (personagem.v_atual < 5) return msg.reply(`Você não possui vida suficient. Sua Vida: ${personagem.v_atual} \n Va se recuperar primeiro!!`)
                let monster = func.returnmonster(personagem.level)
                let embed = new Discord.MessageEmbed()
                    .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
                    .setThumbnail(monster.image)
                    .setDescription(`Você deu de cara com um(a): **${monster.nome}**\n Reaja com 🗡️ para lutar ou 🏃‍♂️ para fugir.`)
                    .addFields(
                        { name: 'LVL', value: `${monster.level}`, inline: true },
                        { name: 'XP', value: `${monster.xp}`, inline: true },
                        { name: 'Vida', value: `${monster.vida}`, inline: true },
                        { name: 'ATK', value: `${monster.ataque}`, inline: true },
                        { name: 'DEF', value: `${monster.defesa}`, inline: true },
                        { name: 'Speed', value: `${monster.speed}`, inline: true }
                    )
                    .setColor(config.COLOR)
                let m = await msg.reply(embed)
                let reactions = ['🗡️', '🏃‍♂️']
                await m.react(reactions[0])
                await m.react(reactions[1])
                let respondeu = false;

                const filter = (reaction, u) => reactions.includes(reaction.emoji.name) && u.id === user.id;
                const collector = m.createReactionCollector(filter, { time: 30000, max: 1 }); // 30 Segundos
                collector.on('end', async (emoji) => {
                    if (!respondeu) {
                        const embed3 = new Discord.MessageEmbed()
                            .setTitle('Acabou o tempo')
                            .setColor(config.COLOR)
                            .setDescription(`${user} nào respondeu a tempo!. O comando entro em coldown!!`)
                            .setTimestamp()
                            .setFooter('acabou o tempo para caçar!')
                        await msg.channel.send(embed3);
                        m.delete();
                        msg.delete();
                    }
                })

                collector.on('collect', async (emoji) => {
                    switch (emoji._emoji.name) {
                        case reactions[0]:
                            respondeu = true;
                            if (respondeu) {
                                func.huntbatle(monster, personagem, user, msg, 0)
                                await m.delete();
                            }
                            break;
                        case reactions[1]:
                            respondeu = true;
                            if (respondeu) {
                                func.huntleave(monster, personagem, user, msg)
                                await m.delete();
                            }
                            break;
                        default:
                            break;
                    }
                });
            } else {
                let minutes = Math.trunc((dif._milliseconds / 1000) / 60);
                let seconds = Math.trunc((dif._milliseconds - (minutes * 60000)) / 1000)
                minutes = 1 - minutes
                seconds = 60 - seconds
                let embed = new Discord.MessageEmbed()
                    .setTitle('Comando em Cooldown !!')
                    .setColor(config.COLOR)
                    .setDescription('O comando de caçar se encontra no momento em cooldown. \n Tempo para usar novamente: ')
                    .addFields(
                        { name: 'Min', value: `${minutes}`, inline: true },
                        { name: 'Sec', value: `${seconds}`, inline: true }
                    )
                let m = await msg.channel.send(embed)
                await func.timer(10000)
                m.delete()
            }
        }
    }
}