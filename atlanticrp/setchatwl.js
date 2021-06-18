const Discord = require('discord.js')
const { PORCENT, COLOR, OWNER } = require('../json/config-wl.json')
const db = require('quick.db');

module.exports = {
    name: "setcwl",
    aliases: ["scwl"],
    description: "Setar o canal do comando wl",
    async execute(msg, args, client) {
        if (msg.author.id == OWNER) {
            db.set(`wl.channel`, msg.channel.id);
            await msg.delete();
        }
    }
}