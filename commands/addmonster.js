const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')
const func = require("./functions")

module.exports = {
    name: "addmonster",
    aliases: ["addm", "am"],
    description: "Adicionar monstro no rpg.",
    //m.addm name image level-max level-min vida_max vida_min xp-man xp-min ataque-max ataque-min defesa-max defesa-min speed-max speed-min dinheiro categoria
    //t.addm Slime https://i.imgur.com/l2mjTlM.png 5 1 25 15 130 60 18 10 15 9 15 9 90 1
    async execute(msg, args, client) {
        if (!args[15]) return msg.reply('Use o comando corretamente. - m.addm name image level-max level-min vida_max vida_min xp-man xp-min ataque-max ataque-min defesa-max defesa-min speed-max speed-min dinheiro categoria')
        if (msg.author.id != config.OWNER) return msg.reply('Apenas os ADM do sistema de RPG podem usar esse comando.')
        let ID = await db.get(`rpg.monster.dados.lastID`) > 0 ? db.get(`rpg.monster.dados.lastID`) + 1 : 1
        let embed = new Discord.MessageEmbed()
            .setTitle(`Nome: ${args[0]}`)
            .addFields(
                { name: `LVL Max`, value: `${args[2]}`, inline: true },
                { name: `LVL Min`, value: `${args[3]}`, inline: true },
                { name: `Vida Max`, value: `${args[4]}`, inline: true },
                { name: `Vida Min`, value: `${args[5]}`, inline: true },
                { name: `XP Max`, value: `${args[6]}`, inline: true },
                { name: `XP Min`, value: `${args[7]}`, inline: true },
                { name: `Atk Max`, value: `${args[8]}`, inline: true },
                { name: `Atk Min`, value: `${args[9]}`, inline: true },
                { name: `Def Max`, value: `${args[10]}`, inline: true },
                { name: `Def Min`, value: `${args[11]}`, inline: true },
                { name: `Speed Max`, value: `${args[12]}`, inline: true },
                { name: `Speed Min`, value: `${args[13]}`, inline: true },
                { name: `Money Drop`, value: `${args[14]}`, inline: true },
                { name: `ID`, value: `${ID}`, inline: true },
                { name: `Categoria`, value: `${args[15]}`, inline: true }
            )
            .setThumbnail(args[1])
        let m = await msg.channel.send(embed)
        await m.react('👍')
        await m.react('👎')
        await msg.delete()
        let reactions = ["👍", "👎"]
        const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === msg.author.id;
        const collector = await m.createReactionCollector(filter, { time: 30000, max: 1 }); // 30 Segundos
        collector.on('collect', async (emoji) => {
            switch (emoji._emoji.name) {
                case reactions[0]:
                    try {
                        db.set(`rpg.monster.dados.lastID`, ID)
                        db.set(`rpg.monster.dados.${ID}.name`, args[0])
                        db.set(`rpg.monster.dados.${ID}.image`, args[1])
                        db.set(`rpg.monster.dados.${ID}.level_max`, args[2])
                        db.set(`rpg.monster.dados.${ID}.level_min`, args[3])
                        db.set(`rpg.monster.dados.${ID}.vida_max`, args[4])
                        db.set(`rpg.monster.dados.${ID}.vida_min`, args[5])
                        db.set(`rpg.monster.dados.${ID}.xp_max`, args[6])
                        db.set(`rpg.monster.dados.${ID}.xp_min`, args[7])
                        db.set(`rpg.monster.dados.${ID}.ataque_max`, args[8])
                        db.set(`rpg.monster.dados.${ID}.ataque_min`, args[9])
                        db.set(`rpg.monster.dados.${ID}.defesa_max`, args[10])
                        db.set(`rpg.monster.dados.${ID}.defesa_min`, args[11])
                        db.set(`rpg.monster.dados.${ID}.speed_max`, args[12])
                        db.set(`rpg.monster.dados.${ID}.speed_min`, args[13])
                        db.set(`rpg.monster.dados.${ID}.dinheiro`, args[14])
                        db.push(`rpg.monster.dados.lista`, ID)
                        db.push(`rpg.monster.dados.categoria.${args[15]}`, ID)
                        msg.reply('Monstro adicionado com sucesso!')
                    } catch (err) {
                        msg.reply(`Erro: ${err}`)
                        console.log(err)
                    }
                    break;
                case reactions[1]:
                    try {
                        msg.reply('Envie o comando novamente caso deseje!');
                    } catch (err) {
                        msg.reply(`Erro: ${err}`)
                        console.log(err)
                    }
                    break;
                default:
                    break;
            }
            collector.on('end', () => {
                try {
                    if (!m.deleted) return m.delete()
                } catch (err) {
                    console.log('Erro no final')
                }
            })
        })

    }
}