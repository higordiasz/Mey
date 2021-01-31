const Discord = require("discord.js");
const { COLOR } = require('../json/config.json')
const fetch = require('node-fetch')

module.exports = {
    name: "pokemon",
    aliases: ["poke"],
    description: "Mostra os dados de um pokemon!",
    async execute(msg, args, client) {
        if (!args[0]) return msg.reply(`Me informe o nome ou ID do pokemon que deseja!`)
        if (isNaN(args[0])) {
            try {
                let dados;
                try {
                    dados = await fetch(`https://some-random-api.ml/pokedex?pokemon=${args[0]}`)
                        .then(res => res.json())
                        .then(json => json);
                } catch (err) {
                    msg.reply(`Não consegui localizar o pokemon **${args[0]}**, tente novamente.`)
                }
                if (!dados) return;
                let name = dados.name
                let p = name.slice(0, 1)
                p = p.toUpperCase()
                name = p + name.slice(1)
                let evolucoes = ""
                for (let i = 0; i < dados.family.evolutionLine.length; i++) {
                    evolucoes += `\n${i + 1} - ${dados.family.evolutionLine[i]}`
                }
                let altura = dados.height.slice(0, 3)
                let embed = new Discord.MessageEmbed()
                    .setColor(COLOR)
                    .setTitle(name)
                    .setDescription(dados.description + "\n\n **Espécie**: " + dados.species[0] + "\n\n **Evoluções**:" + evolucoes)
                    .setThumbnail(dados.sprites.animated)
                    .addFields(
                        { name: 'Geração', value: `${dados.generation}`, inline: true },
                        { name: 'Estágio', value: `${dados.family.evolutionStage}`, inline: true },
                        { name: 'Altura', value: `${altura} m`, inline: true }
                    )
                msg.channel.send(embed)
            } catch (err) {
                console.log(`Erro comando pokemon: ` + err)
            }
        } else {
            try {
                let dados;
                try {
                    dados = await fetch(`https://some-random-api.ml/pokedex?id=${args[0]}`)
                        .then(res => res.json())
                        .then(json => json);
                } catch (err) {
                    msg.reply(`Não consegui localizar o pokemon de ID **${args[0]}**, tente novamente.`)
                }
                if (!dados) return;
                let name = dados.name
                let p = name.slice(0, 1)
                p = p.toUpperCase()
                name = p + name.slice(1)
                let evolucoes = ""
                for (let i = 0; i < dados.family.evolutionLine.length; i++) {
                    evolucoes += `\n${i + 1} - ${dados.family.evolutionLine[i]}`
                }
                let altura = dados.height.slice(0, 3)
                let embed = new Discord.MessageEmbed()
                    .setColor(COLOR)
                    .setTitle(name)
                    .setDescription(dados.description + "\n\n **Espécie**: " + dados.species[0] + "\n\n **Evoluções**:" + evolucoes)
                    .setThumbnail(dados.sprites.animated)
                    .addFields(
                        { name: 'Geração', value: `${dados.generation}`, inline: true },
                        { name: 'Estágio', value: `${dados.family.evolutionStage}`, inline: true },
                        { name: 'Altura', value: `${altura} m`, inline: true }
                    )
                msg.channel.send(embed)
            } catch (err) {
                console.log(`Erro comando pokemon: ` + err)
            }
        }
    }
}