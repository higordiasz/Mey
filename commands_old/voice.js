const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')

module.exports = {
    name: "voice",
    aliases: ["vp"],
    description: "Mostra o tempo que o usuario passou nos channels de voz no servidor. Caso o sistema esteja funcionando no servidor.",
    execute(msg, args, client) {
        let voice = db.get(`config_${msg.guild.id}.voice`)
        if (voice == true) {
            let user = msg.mentions.users.first() || msg.author
            let milliseconds = db.get(`voice_${msg.guild.id}.voice.${user.id}.milliseconds`) || 0
            let seconds = db.get(`voice_${msg.guild.id}.voice.${user.id}.seconds`) || 0
            let minutes = db.get(`voice_${msg.guild.id}.voice.${user.id}.minutes`) || 0
            let hours = db.get(`voice_${msg.guild.id}.voice.${user.id}.hours`) || 0
            let days = db.get(`voice_${msg.guild.id}.voice.${user.id}.days`) || 0
            let embed = new Discord.MessageEmbed()
                .setAuthor('Mey System', client.user.displayAvatarURL({ dynamic: true }))
                .setTitle('Tempo Gasto no Servidor!!')
                .setDescription(`O usuario ${user}, ja gastou em nossos\n channel de voz:`)
                .addFields(
                    { name: 'Days', value: `${days}`, inline: true },
                    { name: 'Hours', value: `${hours}`, inline: true },
                    { name: 'Min', value: `${minutes}`, inline: true },
                    { name: 'Sec', value: `${seconds}`, inline: true },
                    { name: 'MSec', value: `${milliseconds}`, inline: true },
                    { name: `⠀`, value: `⠀`, inline: true }
                )
                .setColor(config.COLOR)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setFooter(`Obrigada por utilizar nosso servidor ${user.tag}!!`, user.displayAvatarURL({ dynamic: true }));
            msg.channel.send(embed)
        } else {
            msg.reply('Sistema não esta ativado no servidor.')
        }
    }
}