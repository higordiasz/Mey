const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')

module.exports = {
    name: "voicerank",
    aliases: ["vr", "voicer"],
    description: "Mostra o rank de vocie de todos usuarios que estão no servidor.",
    execute(msg, args, client) {
        let primeiro = [0, 0, 0, 0, 0, 0, 'NA']
        let segundo = [0, 0, 0, 0, 0, 0, 'NA']
        let terceiro = [0, 0, 0, 0, 0, 0, 'NA']
        let quarto = [0, 0, 0, 0, 0, 0, 'NA']
        let quinto = [0, 0, 0, 0, 0, 0, 'NA']
        let users = db.get(`voice_${msg.guild.id}.voice`)
        Object.keys(users).forEach(element => {
            if (!users[element]) return;
            if (users[element].milliseconds_total > quinto[0]) {
                if (users[element].milliseconds_total > quarto[0]) {
                    if (users[element].milliseconds_total > terceiro[0]) {
                        if (users[element].milliseconds_total > segundo[0]) {
                            if (users[element].milliseconds_total > primeiro[0]) {
                                quinto = quarto
                                quarto = terceiro
                                terceiro = segundo
                                segundo = primeiro
                                primeiro = [users[element].milliseconds_total, users[element].milliseconds, users[element].seconds, users[element].minutes, users[element].hours, users[element].days, users[element].tag]
                            } else {
                                quinto = quarto
                                quarto = terceiro
                                terceiro = segundo
                                segundo = [users[element].milliseconds_total, users[element].milliseconds, users[element].seconds, users[element].minutes, users[element].hours, users[element].days, users[element].tag]
                            }
                        } else {
                            quinto = quarto
                            quarto = terceiro
                            terceiro = [users[element].milliseconds_total, users[element].milliseconds, users[element].seconds, users[element].minutes, users[element].hours, users[element].days, users[element].tag]
                        }
                    } else {
                        quinto = quarto
                        quarto = [users[element].milliseconds_total, users[element].milliseconds, users[element].seconds, users[element].minutes, users[element].hours, users[element].days, users[element].tag]
                    }
                } else {
                    quinto = [users[element].milliseconds_total, users[element].milliseconds, users[element].seconds, users[element].minutes, users[element].hours, users[element].days, users[element].tag]
                }
            }
        });
        let embed = new Discord.MessageEmbed()
            .setAuthor('Mey System', client.user.displayAvatarURL({ dynamic: true }))
            .setTitle('Voice Rank')
            .setDescription(`\n **1 - ${primeiro[6]} \n D - ${primeiro[5]} // H - ${primeiro[4]} // M - ${primeiro[3]} // S - ${primeiro[2]} // ML - ${primeiro[1]}**\n
                \n **2 - ${segundo[6]} \n D - ${segundo[5]} // H - ${segundo[4]} // M - ${segundo[3]} // S - ${segundo[2]} // ML - ${segundo[1]}**\n
                \n **3 - ${terceiro[6]} \n D - ${terceiro[5]} // H - ${terceiro[4]} // M - ${terceiro[3]} // S - ${terceiro[2]} // ML - ${terceiro[1]}**\n
                \n **4 - ${quarto[6]} \n D - ${quarto[5]} // H - ${quarto[4]} // M - ${quarto[3]} // S - ${quarto[2]} // ML - ${quarto[1]}**\n
                \n **5 - ${quinto[6]} \n D - ${quinto[5]} // H - ${quinto[4]} // M - ${quinto[3]} // S - ${quinto[2]} // ML - ${quinto[1]}**`)
            .setColor(config.COLOR)
            .setFooter(`Rank de usuario!! - Pedido por: ${msg.author.tag}`);
        msg.channel.send(embed)
        msg.delete()
    }
}