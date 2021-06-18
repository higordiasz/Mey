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
const { PORCENT, COLOR, OWNER, rwl, wlRole } = require('../json/config-wl.json')
const { Aprovado2, Reprovado2 } = require('./log-controller')
const db = require('quick.db');
const mysql = require('mysql');

exports.Reprovado = async function (msg, args, client, idAlvo, nameAlvo, motivo, avaliador) {
    try {
        let rpID = db.get(`wl.reprovados`);
        if (rpID == null) return console.log("[ERRO] Canal de Reprovados não configurado");
        if (rpID == "") return console.log("[ERRO] Canal de Reprovados nulo");
        let rpChannel = await client.channels.fetch(rpID);
        if (rpChannel == null)
            return console.log("[ERRO] Canal de Reprovados não encontrado");
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

exports.Aprovado = async function (msg, args, client, idAlvo, nameAlvo, avaliador) {
    try {
        let apID = db.get(`wl.aprovados`);
        if (apID == null)
            return console.log("[ERRO] Canal de Aprovado não configurado");
        if (apID == "")
            return console.log("[ERRO] Canal de Aprovado nulo");
        let apChannel = await client.channels.fetch(apID);
        if (apChannel == null)
            return console.log("[ERRO] Canal de Aprovado não encontrado");
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
                await member.roles.add(wlRole).catch((e) => console.log(e));
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

exports.LiberarID = async function (id) {
    try {
        let con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'skips'
        });
        con.connect(function (err) {
            if (err) {
                return console.log(`[MYSQL] Falha ao conectar\n${err.stack}`)
            }
            var whitelisted = "1";
            var sql = `UPDATE vrp_users SET whitelisted = '${whitelisted}' WHERE id = '${id}'`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(`[MYSQL] Linhas afetadas: ${result.affectedRows}`)
                return console.log("[MYSQL] ID LIBERADO: " + id);
            })
        })
    } catch (e) {
        return console.log(`[MYSQL] Erro ao liberar id:\n${e}`);
    }
}

exports.CheckID = async function (id, msg, args, client, ant) {
    try {
        let con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'skips'
        });
        con.connect(function (err) {
            if (err) {
                console.log(`[MYSQL] Falha ao conectar\n${err.stack}`)
            }
            var sql = `SELECT id FROM vrp_users WHERE id = '${id}'`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                if (result[0] != null) {
                    Aprovado2(msg, args, client, msg.author.id, msg.author.username, client.user)
                    try {
                        try {
                            var whitelisted = "1";
                            var sql2 = `UPDATE vrp_users SET whitelisted = '${whitelisted}' WHERE id = '${id}'`;
                            con.query(sql2, function (err3, result2) {
                                if (err3) throw err3;
                                return console.log("[MYSQL] ID LIBERADO: " + id);
                            })
                            try {
                                msg.member.setNickname(`${ant.nome} | ${ant.passaport}`)
                            } catch (e) {
                                console.log("[ERRO] Mudar o Apelido: " + e)
                            }
                        } catch (e) {
                            return console.log(`[MYSQL] Erro ao liberar id:\n${e}`);
                        }
                    } catch (e) {
                        console.log(`\u001b[32m`, "[ERRO]" + e);
                    }
                } else {
                    Reprovado2(msg, args, client, msg.author.id, msg.author.username, `O passaporte ${id}(ID) não foi encontrado`, client.user);
                }
            })
        })
    } catch {
        return false;
    }
}