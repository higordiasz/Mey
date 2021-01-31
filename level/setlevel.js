const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')
const config = require('../json/config.json')

module.exports = {
    name: "setlevel",
    aliases: ["setl"],
    description: "Ativa ou desativa o sistema de level da mey.",
    async execute(msg, args, client) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return;
        if (!args[0]) return;
        if ((args[0] == `true`) || (args[0] == `false`)) {
            let valor = args[0] == `true` ? true : false
            if (valor) {
                db.set(`server.${msg.guild.id}.levelsystem.ativo`, true)
                msg.reply(`Sistema de \`Level\` setado para: \`true\``)
            } else {
                db.delete(`server.${msg.guild.id}.levelsystem.ativo`)
                msg.reply(`Sistema \`Level\` setado para: \`false\``)
            }
        } else {
            msg.reply('Envie o comando corretamente. Colocando `true` ou `false`')
        }
    }
}