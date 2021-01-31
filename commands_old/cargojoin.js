const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')
const func = require('./functions')

module.exports = {
    name: "cargoj",
    aliases: ["cargojoin", "cargo"],
    description: "Definir cargo de entrada.",
    async execute(msg, args, client) {
        if (!func.isADM(msg.member)) return func.send(msg, 'Oque está tentando fazer ?!. Você não tem permissão para tal!!');
        if (!func.isADM(msg.guild.me)) return func.send(msg, 'Não tenho poder suficiente para tal...');
        let cargoJoin = msg.mentions.roles.first().id || null
        if (cargoJoin == null) return func.send(msg, `Me informe o caso que deseja!! \`${config.PREFIX}cargoj <Mensione o cargo>\``);
        try {
            db.set(`server.${msg.guild.id}.chat.cargoentrada`, cargoJoin)
            let m = await func.send(msg, '  Cargo setado para entrada.')
            await func.timer(10000)
            m.delete()
            msg.delete()
        } catch (err) {
            console.log('Erro ao tentar setar cargo de entrada: ', err)
        }
    }
}