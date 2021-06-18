const Discord = require('discord.js')
const { Reprovado, Aprovado } = require('../controller/wl-controller');

module.exports = {
    name: "testerprovado",
    aliases: ["trep"],
    description: "Testar o reprovado",
    async execute(msg, args, client) {
        await Reprovado(msg, args, client, msg.author.id, msg.author.username, "Teste reprovado", msg.author);
        await Aprovado(msg, args, client, msg.author.id, msg.author.username, msg.author)
    }
}