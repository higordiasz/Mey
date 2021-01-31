const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')
const func = require('../commands/functions')

module.exports = {
    name: "saida",
    aliases: ["sair", "leave"],
    description: "Definir channel de Leave.",
    async execute(msg, args, client) {
        if (!func.isADM(msg.member)) return func.send(msg, 'Oque está tentando fazer ?!. Você não tem permissão para tal!!');
        if (!func.isADM(msg.guild.me)) return func.send(msg, 'Não tenho poder suficiente para tal...');
        try {
            db.set(`server.${msg.guild.id}.chat.leave`, msg.channel.id)
            let m = await func.send(msg, 'Channel setado para saida.')
            await func.timer(10000)
            m.delete()
            msg.delete()
        } catch (err) {
            console.log('Erro ao definir chat de saida: ' + err)
        }
    }
}