const Discord = require('discord.js')
const config = require('../json/config.json')
const os = require('os')

module.exports = {
    name: "serves",
    aliases: ["servers"],
    description: "Stats do servidor",
    execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setTitle('🌸 Status da Mey!')
            .setColor(config.COLOR)
            .addFields(
                {
                    name: '🌐 Servidores',
                    value: `Em ${client.guilds.cache.size} servidores.`,
                    inline: true
                },
                {
                    name: '📺 Canais',
                    value: `Em ${client.channels.cache.size} canais.`,
                    inline: true
                },
                {
                    name: '👥 Servidores Usuários',
                    value: `Servindo ${client.users.cache.size}`,
                    inline: true
                },
                {
                    name: '⏳ Ping',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: 'Data de entrada',
                    value: client.user.createdAt,
                    inline: true
                },
                {
                    name: 'Informação Servidor.',
                    value: `Cores: ${os.cpus().length}`,
                    inline: true
                }
            )
            .setFooter(`Meus criadores: Dias - Jon • Comando usado por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(embed)
    }
}