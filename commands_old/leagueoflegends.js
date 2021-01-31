const Discord = require('discord.js')
const config = require('../json/config.json')
const opgg = require('opgg-scrape')

module.exports = {
    name: "lol",
    aliases: ["league", "leagueoflegends"],
    description: "Mostra o tempo que o usuario passou nos channels de voz no servidor. Caso o sistema esteja funcionando no servidor.",
    execute(msg, args, client) {
        if (!args[0]) return msg.reply('Envie o comando corretamente!')
        opgg.getStats(args.join(" "), { region: 'br', refresh: false }).then(dados => {
            let embed = new Discord.MessageEmbed()
                .setColor(config.COLOR)
                .setAuthor(`Pedido por: ${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Dados do invocador ${dados.name}:`)
                .setImage(dados.avatarURL)
                .addFields(
                    { name: 'Name', value: `${dados.name}`, inline: true },
                    { name: 'Level', value: `${dados.level}`, inline: true },
                    { name: '⠀', value: `⠀`, inline: true },
                    { name: 'Rank', value: `${dados.rank}`, inline: true },
                    { name: 'PDL', value: `${dados.rankedLP}`, inline: true },
                    { name: 'KDA', value: `${dados.KDARatio}`, inline: true },
                    { name: 'Kills', value: `${dados.KDA.kills}`, inline: true },
                    { name: 'Mortes', value: `${dados.KDA.deaths}`, inline: true },
                    { name: 'Assists', value: `${dados.KDA.assists}`, inline: true }
                )
            msg.reply(embed)
        });

    }
}