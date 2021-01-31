//LETS GET STARTED
const { get } = require("request-promise-native");
const { MessageEmbed } = require("discord.js")
const config = require("../json/config.json")

module.exports = {
    name: "anime",
    aliases: ["a", "an"],
    description: "Mostra o tempo que o usuario passou nos channels de voz no servidor. Caso o sistema esteja funcionando no servidor.",
    execute(message, args, client) {
        if (!args.length) {
            return message.channel.send("Por favor, digite o nome do ANIME!")
        }
        //DEFINE OPTIONS
        let option = {
            url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`,
            method: `GET`,
            headers: {
                'Content-Type': "application/vnd.api+json",
                'Accept': "application/vnd.api+json"
            },
            json: true
        }
        message.channel.send("Procurando informações").then(msg => {
            get(option).then(body => {
                try {
                    let embed = new MessageEmbed()
                        .setTitle(body.data[0].attributes.titles.en)
                        .setColor(config.COLOR)
                        .setDescription(body.data[0].attributes.synopsis)
                        .setThumbnail(body.data[0].attributes.posterImage.original)
                        .addField("Ratings", body.data[0].attributes.averageRating)
                        .addField("TOTAL DE EPISÓDIOS", body.data[0].attributes.episodeCount)
                        .setFooter(`© Niko Niko Niiii! • Comando usado por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    //.setImage(body.data[0].attributes.coverImage.large)
                    //try it
                    message.channel.send(embed)
                    msg.delete();
                } catch (err) {
                    msg.delete();
                    return message.channel.send("Não reconheço o nome do ANIME");
                }
            }
            )
        })
    }
}