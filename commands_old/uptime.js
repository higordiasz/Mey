const Discord = require('discord.js')
const config = require('../json/config.json')

module.exports = {
    name: "uptime",
    aliases: ["up"],
    description: "Informações do usuario.",
    async execute(msg, args, client) {
        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        let uptime = `🗓️ ${days.toFixed()} dias\n🗓️ ${hours.toFixed()} horas\n🗓️ ${minutes.toFixed()} minutos\n🗓️ ${seconds.toFixed()} segundos`;

        const embed = new Discord.MessageEmbed()
            .setTitle(`Tempo de atividade 🕰️`)
            .setThumbnail("https://imgur.com/WZMylbw.gif")
            .setColor(config.COLOR)
            .setDescription(`**Estou online há:**\n${uptime}`)

        msg.channel.send(embed);
    }
}