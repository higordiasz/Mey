const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "setvoice",
    aliases: ["sv"],
    description: "Ativa o log de Voice no servidor.",
    execute(msg, args, client) {
        if (!args[0]) return;
        if ((args[0] == `true`) || (args[0] == `false`)) {
            let valor = args[0] == `true` ? true : false
            db.set(`config_${msg.guild.id}.voice`, valor)
            msg.reply(`Controle de voice setado para: \`${valor}\``)
        } else {
            msg.reply('Envie o comando corretamente. Colocando `true` ou `false`')
        }
    }
}