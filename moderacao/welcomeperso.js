const Discord = require("discord.js");
const config = require('../json/config.json')
const description = require('../json/comandos.json')

module.exports = {
    name: "welcome",
    aliases: ["wc"],
    description: "Seta uma mensagem de bem-vindo personalizada",
    async execute(msg, args, client) {
        if (!msg.member.hasPermission(`ADMINISTRATOR`)) return msg.reply(`Seu poder não ultrapassa 8000!!!!`)
        let embed = new Discord.MessageEmbed()
            .setTitle(`1 - Titulo`)
            .setDescription(`2 - Descrição`)
            .setColor(config.COLOR)
            .setFooter(`3 - Footer`)
            .setAuthor(`4 - Author`)
        let realembed = new Discord.MessageEmbed()
        let m = await msg.channel.send(embed)
        const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '☑'];
        await m.react(reactions[0])
        await m.react(reactions[1])
        await m.react(reactions[2])
        await m.react(reactions[3])
        await m.react(reactions[4])
        const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === msg.author.id;
        const mfilter = (user) => user.id === msg.author.id;
        const collector = m.createReactionCollector(filter, { time: 120000 }); // 120 Segundos
        collector.on('collect', (emoji) => {
            switch (emoji._emoji.name) {
                case reactions[0]:
                    m.channel.send(`Envie a mensagem que deseja para o Titulo:`)
                    const mcollector = m.channel.createMessageCollector(mfilter, { max: 1, time: 30000 });
                    mcollector.on(`collect`, message => {
                        console.log(`Entrei aqui e o content é: ${message.content}`)
                        realembed.setTitle(message.content)
                    })
                    break;
                case reactions[1]:
                    m.channel.send(`Envie a mensagem que deseja para o Titulo:`)
                    const mcollector2 = m.channel.createMessageCollector(mfilter, { max: 1, time: 30000 });
                    mcollector2.on(`collect`, message => {
                        console.log(`Entrei aqui na descrição e o content é: ${message.content}`)
                        realembed.setDescription(message.content)
                    })
                    break;
                case reactions[2]:
                    break;
                case reactions[3]:
                    break;
                case reactions[4]:
                    m.delete()
                    break;
            }
        })
        collector.on('end', () => {
            msg.channel.send(realembed)
        })
    }
}