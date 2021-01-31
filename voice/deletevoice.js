const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')

module.exports = {
    name: "voicedelete",
    aliases: ["vd", "voiced"],
    description: "Mostra o rank de vocie de todos usuarios que estão no servidor.",
    execute(msg, args, client) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            let embed = new Discord.MessageEmbed()
                .setAuthor('Mey System', client.user.displayAvatarURL({ dynamic: true }))
                .setTitle('Deletando Dados!!')
                .setDescription(`O usuario ${msg.author}, requisitou que\n fosse deletado os dados de voice do servidor!!`)
                .addFields(
                    { name: 'Requisitante', value: `${msg.author.tag}`, inline: true },
                    { name: 'Requisição', value: `Delete DataBase`, inline: true },
                    { name: 'Resposta', value: `Access Denied`, inline: true }
                )
                .setColor(config.COLOR)
                .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
                .setFooter(`Requisição não pode ser concluida: Access Denied - ${msg.author.tag}!!`, msg.author.displayAvatarURL({ dynamic: true }))
            msg.channel.send(embed)
            msg.delete()
        } else {
            if (db.delete(`voice_${msg.guild.id}.voice`)) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Mey System', client.user.displayAvatarURL({ dynamic: true }))
                    .setTitle('Deletando Dados!!')
                    .setDescription(`O usuario ${msg.author}, requisitou que\n fosse deletado os dados de voice do servidor!!`)
                    .addFields(
                        { name: 'Requisitante', value: `${msg.author.tag}`, inline: true },
                        { name: 'Requisição', value: `Delete DataBase`, inline: true },
                        { name: 'Resposta', value: `Sucesso`, inline: true }
                    )
                    .setColor(config.COLOR)
                    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(`Requisição concluida com sucesso ${msg.author.tag}!!`, msg.author.displayAvatarURL({ dynamic: true }));
                msg.channel.send(embed)
                msg.delete()
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Mey System', client.user.displayAvatarURL({ dynamic: true }))
                    .setTitle('Deletando Dados!!')
                    .setDescription(`O usuario ${msg.author}, requisitou que\n fosse deletado os dados de voice do servidor!!`)
                    .addFields(
                        { name: 'Requisitante', value: `${msg.author.tag}`, inline: true },
                        { name: 'Requisição', value: `Delete DataBase`, inline: true },
                        { name: 'Resposta', value: `Falha`, inline: true }
                    )
                    .setColor(config.COLOR)
                    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(`Requisição concluida com falha ${msg.author.tag}!!`, msg.author.displayAvatarURL({ dynamic: true }))
                msg.channel.send(embed)
                msg.delete()
            }
        }
    }
}