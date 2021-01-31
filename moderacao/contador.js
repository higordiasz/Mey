const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')
const func = require('../commands/functions')

module.exports = {
    name: "contador",
    aliases: [],
    description: "Definir mensagem do contador no topico.",
    async execute(message, args, client) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Oque está tentando fazer ?!. Você não tem permissão para tal!');
        if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('Não tenho poder suficiente para tal...');

        let msg = args.join(" ");
        message.channel.send(`Mensagem definida para: ` + msg)
        db.set(`msgcontador_${message.guild.id}`, msg)
    }
}