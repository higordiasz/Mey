const Discord = require('discord.js')
const config = require('../json/config.json')

module.exports = {
    name: "listservers",
    aliases: [],
    description: "Enviarei todos os servidores em que me encontro no channel.",
    execute(msg, args, client) {
        if ((msg.author.id != config.OWNER) && (msg.author.id != config.OWNER2)) return msg.channel.send(`Apenas meus criadores podem usar esse comando!!`)
        try {
            client.guilds.cache.forEach(guild => {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(`${guild.name}`)
                    .setDescription(`Alguns dados sobre o servidor: \n [Icone](${guild.iconURL({ dynamic: true })})`)
                    .setThumbnail(guild.iconURL({ dynamic: true }))
                    .addFields(
                        { name: `ID`, value: `${guild.id}`, inline: true },
                        { name: `Dono`, value: `${guild.owner.user.tag}`, inline: true },
                        { name: `ID do Dono`, value: `${guild.ownerID}`, inline: true },
                        { name: `Creado em`, value: `${guild.createdAt}`, inline: true },
                        { name: `Membros`, value: `${guild.memberCount}`, inline: true },
                        { name: `Roles`, value: `${guild.roles.cache.size}`, inline: true }
                    )
                if (guild.bannerURL != null) {
                    embed.setImage(guild.bannerURL())
                }
                msg.channel.send(`${guild.name} - ${guild.owner.user.tag}`, embed)
            })
        } catch (err) {
            console.log(`Erro comando listservers: ` + err)
        }
    }
}