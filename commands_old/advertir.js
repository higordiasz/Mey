const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')
const func = require("./functions")

module.exports = {
    name: "advertir",
    aliases: ["adv"],
    description: "De uma advertencia no usuario.",
    execute(msg, args, client) {
        if (!func.isADM(msg.member)) return msg.channel.send('Oque está tentando fazer ?!. Você não tem permissão para tal!!');
        if (!func.isADM(msg.guild.me)) return msg.channel.send('Não tenho poder suficiente para tal...');
        if (!msg.mentions.users.first()) return msg.reply("Mencione o usuario a ser advertido.");
        if (!args[0].startsWith('<@')) return msg.reply('O usuario deve ser o primeiro argumento!')
        if (!args[1]) return msg.channel.send('Me diga o motivo da advertencia!!')
        args.shift()
        let motivo = args.join(" ")
        let user = msg.mentions.users.first();
        let nadv = (db.get(`server_${msg.guild.id}.advertencias.${user.id}.quantidade`) || 0) + 1
        if (nadv < 3) {
            db.set(`server_${msg.guild.id}.advertencias.${user.id}.adv${nadv}.motivo`, motivo)
            db.set(`server_${msg.guild.id}.advertencias.${user.id}.adv${nadv}.author`, msg.author.tag)
            db.add(`server_${msg.guild.id}.advertencias.${user.id}.quantidade`, 1)
            let embed = new Discord.MessageEmbed()
                .setAuthor('Mey System', client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`ADVERTÊNCIA`)
                .setDescription(`${user.tag} acaba de levar uma advertencia. \nFique atento as regras do servidor.`)
                .addFields(
                    { name: `Autor`, value: `${msg.author.tag}`, inline: true },
                    { name: `Motivo`, value: `${motivo}`, inline: true },
                    { name: `Numero`, value: `${nadv}`, inline: true }
                )
                .setColor(config.COLOR)
                .setFooter('Fique atento as regras do servidor para não ser banido.')
            msg.channel.send(embed);
        } else {
            let adv1_autor = db.get(`server_${msg.guild.id}.advertencias.${user.id}.adv1.author`) || "NA"
            let adv1_motivo = db.get(`server_${msg.guild.id}.advertencias.${user.id}.adv1.motivo`) || "NA"
            let adv2_autor = db.get(`server_${msg.guild.id}.advertencias.${user.id}.adv2.author`) || "NA"
            let adv2_motivo = db.get(`server_${msg.guild.id}.advertencias.${user.id}.adv2.motivo`) || "NA"
            let embed = new Discord.MessageEmbed()
                .setAuthor('Mey System', client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`BANIMENTO`)
                .setDescription(`${user.tag} acaba de ser banido do servidor. \nLevou 3 advertencias. Sendo elas:`)
                .addFields(
                    { name: `Autor`, value: `${adv1_autor}`, inline: true },
                    { name: `Motivo`, value: `${adv1_motivo}`, inline: true },
                    { name: `Numero`, value: `1`, inline: true },
                    { name: `Autor`, value: `${adv2_autor}`, inline: true },
                    { name: `Motivo`, value: `${adv2_motivo}`, inline: true },
                    { name: `Numero`, value: `2`, inline: true },
                    { name: `Autor`, value: `${msg.author.tag}`, inline: true },
                    { name: `Motivo`, value: `${motivo}`, inline: true },
                    { name: `Numero`, value: `3`, inline: true }
                )
                .setColor(config.COLOR)
                .setFooter('Fique atento as regras do servidor para não ser banido.')
            try {
                user.send(embed)
            } catch {
                msg.channel.send('Nao consegui enviar mensagem ao usuario avisando do banimento.')
            }
            try {
                //msg.guild.members.cache.fin(member => member.user.id == user.id).ban('Expulso por tomar 3 advertencias.');
                let member = msg.mentions.members.first();
                if (member.bannable) {
                    member.ban('Mey System - 3 Advertencia!')
                    msg.channel.send(embed)
                } else {
                    let embed2 = new Discord.MessageEmbed()
                        .setAuthor('Mey System', client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle(`BANIMENTO`)
                        .setDescription(`${user.tag} nao consegui banir o usuario. \nLevou 3 advertencias. Sendo elas:`)
                        .addFields(
                            { name: `Autor`, value: `${adv1_autor}`, inline: true },
                            { name: `Motivo`, value: `${adv1_motivo}`, inline: true },
                            { name: `Numero`, value: `1`, inline: true },
                            { name: `Autor`, value: `${adv2_autor}`, inline: true },
                            { name: `Motivo`, value: `${adv2_motivo}`, inline: true },
                            { name: `Numero`, value: `2`, inline: true },
                            { name: `Autor`, value: `${msg.author.tag}`, inline: true },
                            { name: `Motivo`, value: `${motivo}`, inline: true },
                            { name: `Numero`, value: `3`, inline: true }
                        )
                        .setColor(config.COLOR)
                        .setFooter('Fique atento as regras do servidor para não ser banido.')
                    msg.channel.send(embed2)
                }
            } catch (err) {
                msg.channel.send('Nao consigo banir este usuario.')
                console.log(err)
            }
            db.delete(`server_${msg.guild.id}.advertencias.${user.id}`)
        }

    }
}