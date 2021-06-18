const Discord = require('discord.js')
const { PORCENT, COLOR, OWNER } = require('../json/config-wl.json')
const db = require('quick.db');

module.exports = {
    name: "setapr",
    aliases: ["seta"],
    description: "Setar o canal dos aprovados wl",
    async execute(msg, args, client) {
        if (msg.author.id == OWNER) {
            db.set(`wl.aprovados`, msg.channel.id);
            await msg.delete();
        }
    }
}