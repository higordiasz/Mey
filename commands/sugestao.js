const Discord = require('discord.js')
const config = require('../json/config.json')

module.exports = {
    name: "sugestao",
    aliases: [],
    description: "Envia uma sugestão.",
    execute(message, args, bot) {
        try {

            let sugestão = args.join(" ")
            if (!sugestão) return message.channel.send("Dê uma sugestão!")

            const sugerir = new Discord.MessageEmbed()
                .setColor(config.COLOR)
                .setTitle("Confirmação!")
                .setDescription("Quer realmente enviar essa sugestão?\n" + sugestão + "\n\nSim: :heavy_check_mark: Não: :x:")
                .setTimestamp()
                .setFooter(`Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({ Size: 32 }))
            message.channel.send(sugerir).then(msg => {
                msg.react('✔️').then(r => {
                    msg.react('❌').then(r => {

                    })
                })

                const confirmarFilter = (reaction, user) => reaction.emoji.name === '✔️' && user.id === message.author.id;
                const negarFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

                const confirmar = msg.createReactionCollector(confirmarFilter);
                const negar = msg.createReactionCollector(negarFilter);


                confirmar.on('collect', r2 => {
                    msg.reactions.removeAll()

                    sugerir.setTitle("Confirmado!")
                    sugerir.setDescription(":heavy_check_mark: | Sua sugestão foi enviada com sucesso!")
                    msg.edit(sugerir)

                    bot.channels.cache.get("753826761309028383").send("Sugestão enviada por " + message.author.tag + " \n__Sugestão__\n```" + sugestão + "```")

                })

                negar.on('collect', r2 => {
                    msg.reactions.removeAll()
                    sugerir.setTitle("Negado!")
                    sugerir.setDescription(":x: | Sua sugestão foi cancelada...")
                    msg.edit(sugerir)

                })


            })
        } catch (err) {
            console.log(`Erro Sugestão: ` + err)
        }
    }
}