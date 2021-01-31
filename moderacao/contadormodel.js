const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../json/config.json')

module.exports = {
    name: "mcontador",
    aliases: [],
    description: "Definir mensagem do contador no topico.",
    async execute(msg, args, client) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Oque está tentando fazer ?!. Você não tem permissão para tal!');
        if (!msg.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('Não tenho poder suficiente para tal...');
        try {
            let modelo1 = [await client.emojis.cache.find(emoji => emoji.name === "one_mey1"), await client.emojis.cache.find(emoji => emoji.name === "two_mey1"), await client.emojis.cache.find(emoji => emoji.name === "three_mey1")]
            let modelo2 = [await client.emojis.cache.find(emoji => emoji.name === "one_mey2"), await client.emojis.cache.find(emoji => emoji.name === "two_mey2"), await client.emojis.cache.find(emoji => emoji.name === "three_mey2")]
            let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Reaja a essa mensagem com o contador desejado para definir qual sera usado:`)
                .setTitle(`Escolha qual emoji devo usar para meu contador em seu servidor !!`)
                .addFields(
                    { name: "Padrão - 1", value: `:one::two::three:`, inline: true },
                    { name: "Estilo - 2 ", value: `${modelo1[0]}${modelo1[1]}${modelo1[2]}`, inline: true },
                    { name: "Estilo - 3", value: `${modelo2[0]}${modelo2[1]}${modelo2[2]}`, inline: true }
                )
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            let m = await msg.channel.send(embed)
            await m.react(`1️⃣`)
            await m.react(modelo1[1])
            await m.react(modelo2[2])
            let reactions = [`1️⃣`, modelo1[1].name, modelo2[2].name]
            let embed_r = new Discord.MessageEmbed()
            const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === msg.author.id;
            const collector = await m.createReactionCollector(filter, { time: 60000, max: 1 }); // 30 Segundos
            collector.on('collect', (emoji) => {
                switch (emoji._emoji.name) {
                    case reactions[0]:
                        embed_r.setColor("RANDOM")
                        embed_r.setDescription(`Contador configurado como o modelo padrão!!`)
                        embed_r.addField(`Modelo Configurado:`, `1️⃣2️⃣3️⃣`, true)
                        msg.delete()
                        db.set(`server.${msg.guild.id}.chat.contadom`, 1)
                        msg.channel.send(embed_r)
                        break;
                    case reactions[1]:
                        embed_r.setColor("RANDOM")
                        embed_r.setDescription(`Contador configurado como o modelo 1!!`)
                        embed_r.addField(`Modelo Configurado:`, `${modelo1[0]}${modelo1[1]}${modelo1[2]}`, true)
                        msg.delete()
                        db.set(`server.${msg.guild.id}.chat.contadom`, 2)
                        msg.channel.send(embed_r)
                        break;
                    case reactions[2]:
                        embed_r.setColor("RANDOM")
                        embed_r.setDescription(`Contador configurado como o modelo 2!!`)
                        embed_r.addField(`Modelo Configurado:`, `${modelo2[0]}${modelo2[1]}${modelo2[2]}`, true)
                        msg.delete()
                        db.set(`server.${msg.guild.id}.chat.contadom`, 3)
                        msg.channel.send(embed_r)
                        break;
                }
                collector.on('end', () => {
                    m.delete()
                })
            })
        } catch (err) {
            console.log(`Erro ao definir modelo de contador: ` + err)
        }
    }
}