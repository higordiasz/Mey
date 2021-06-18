const Discord = require('discord.js')
const { PORCENT, COLOR, OWNER } = require('../json/config-wl.json')
const db = require('quick.db');

module.exports = {
    name: "setrep",
    aliases: ["setr"],
    description: "Setar o canal dos reprovados wl",
    async execute(msg, args, client) {
        if (msg.author.id == OWNER) {
            db.set(`wl.reprovados`, msg.channel.id);
            await msg.delete();
        }
    }
}