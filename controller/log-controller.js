const Discord = require('discord.js')
const mongoose = require('mongoose');
const VDM = mongoose.model('VDM');
const RDM = mongoose.model('RDM');
const SAFEZ = mongoose.model('SAFEZ');
const POWER = mongoose.model('POWER');
const META = mongoose.model('META');
const COMBATL = mongoose.model('COMBATL');
const AMV = mongoose.model('AMV'); //Amor a Vida
const ALEATORIOONE = mongoose.model('ALEATORIOONE');
const ALEATORIOTWO = mongoose.model('ALEATORIOTWO');
const ALEATORIOTHREE = mongoose.model('ALEATORIOTHREE');
const moment = require('moment');
const { PORCENT, COLOR, OWNER, rwl, wlRole } = require('../json/config-wl.json')
const db = require('quick.db');
const mysql = require('mysql');
const gLog = "842869842330779698";

exports.LogAddMoedas = async function (msg, args, client, autor, id, qtd) {
    try {
        let avatar = client.user.displayAvatarURL({ format: 'png' });
        let embed = new Discord.MessageEmbed()
            .setTitle("Moedas - Atlantic City")
            .setColor(COLOR)
            .setDescription(`Foram adicionadas '${qtd}' moedas para o ID: ${id}`)
            .addFields(
                { name: "Autor", value: `${autor.username}`, inline: true },
                { name: "Data", value: `${moment(moment.now()).format('DD/MM/YYYY')}`, inline: true },
                { name: "Horario", value: `${moment(moment.now()).format('hh:mm:ss')}`, inline: true }
            )
            .setFooter(`Atlantic City`, avatar);
        let g = await client.guilds.cache.get(gLog);
        let c = await g.channels.cache.get("848048132797497414");
        await c.send(embed);
    } catch (e) { console.log(e) }
}

exports.Reprovado2 = async function (msg, args, client, idAlvo, nameAlvo, motivo, avaliador) {
    try {
        let rpID = db.get(`wl.reprovados`);
        if (rpID == null)
            return;
        if (rpID == "")
            return;
        let rpChannel = await client.channels.fetch(rpID);
        if (rpChannel == null)
            return;
        let avatar = avaliador.displayAvatarURL({ format: 'png' });
        let user = await client.users.fetch(idAlvo);
        if (user != null) {
            let embed = new Discord.MessageEmbed()
                .setTitle('WL - Reprovado')
                .setColor(COLOR)
                .setDescription(`Seu pedido de whitelist foi reprovado pelo seguinte motivo: \n ${motivo}`)
                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                .setFooter(`Avaliador: ${avaliador.username}`, avatar);
            rpChannel.send(user, embed);
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle('WL - Reprovado')
                .setColor(COLOR)
                .setDescription(`Seu pedido de whitelist foi reprovado pelo seguinte motivo: \n ${motivo}`)
                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                .setFooter(`Avaliador: ${avaliador.username}`, avatar);
            rpChannel.send(nameAlvo, embed);
        }
    } catch (e) { console.log(e) }
}

exports.Aprovado2 = async function (msg, args, client, idAlvo, nameAlvo, avaliador) {
    try {
        let apID = db.get(`wl.aprovados`);
        if (apID == null)
            return;
        if (apID == "")
            return;
        let apChannel = await client.channels.fetch(apID);
        if (apChannel == null)
            return;
        let avatar = avaliador.displayAvatarURL({ format: 'png' });
        let user = await client.users.fetch(idAlvo);
        if (user != null) {
            let embed = new Discord.MessageEmbed()
                .setTitle('WL - Aprovado')
                .setColor(COLOR)
                .setDescription(`Seu pedido de whitelist foi aprovado. \nBem-Vindo a Atlantic City !!`)
                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                .setFooter(`Avaliador: ${avaliador.username}`, avatar);
            await apChannel.send(user, embed);
            let member = await msg.guild.members.cache.find((m) => m.user.id === idAlvo);
            if (!member.roles.cache.has(wlRole)) {
                await member.roles.add(wlRole).catch((e) => console.log('[ERRO] Add cargo: ' + e));
            }
            if (member.roles.cache.has('742451983683682463')) {
                await member.roles.remove('742451983683682463').catch((e) => console.log('[ERRO] Remover Cargo: ' + e))
            }
        } else {
            let rpID = db.get(`wl.reprovados`);
            if (rpID == null)
                return;
            if (rpID == "")
                return;
            let rpChannel = await client.channels.fetch(rpID);
            if (rpChannel == null)
                return;
            let embed = new Discord.MessageEmbed()
                .setTitle('WL - Reprovado')
                .setColor(COLOR)
                .setDescription(`Seu pedido de whitelist foi reprovado pelo seguinte motivo: \n Não esta no discord`)
                .setThumbnail("https://i.imgur.com/lWcFhLR.png")
                .setFooter(`Avaliador: ${avaliador.username}`, avatar);
            rpChannel.send(nameAlvo, embed);
        }
    } catch (e) { console.log(e) }
}