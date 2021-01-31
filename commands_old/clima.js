const Discord = require('discord.js')
const fetch = require('node-fetch')
const func = require('./functions.js')
const config = require('../json/config.json')

module.exports = {
    name: "clima",
    aliases: ["cl"],
    description: "Mostra o clima da cidade deseja.",
    async execute(msg, args, client) {
        if (!args[0]) return msg.reply('Me informe o nome da cidade!!')
        let text = ''
        for (let i = 0; i < args.length; i++) {
            text += args[i] + ' '
        }
        function removerAcento(palavra) {
            var palavraSemAcento = "";
            var caracterComAcento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
            var caracterSemAcento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";

            for (var i = 0; i < palavra.length; i++) {
                var char = palavra.substr(i, 1);
                var indexAcento = caracterComAcento.indexOf(char);
                if (indexAcento != -1) {
                    palavraSemAcento += caracterSemAcento.substr(indexAcento, 1);
                } else {
                    palavraSemAcento += char;
                }
            }

            return palavraSemAcento;
        }
        const data = await fetch(`http://api.weatherstack.com/current?access_key=${config.apiKey}&query=${removerAcento(text)}`)
            .then(res => res.json())
            .then(json => json);
        if (data.success == false) return msg.reply('Error!!');
        let avatar = msg.author.displayAvatarURL({ format: 'png' });
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        const embed = new Discord.MessageEmbed()
            .setTitle(`${data.location.name}`)
            .setColor(config.COLOR)
            .setDescription(`Clima atual em ${data.location.name}:`)
            .addFields(
                { name: `Horario`, value: `${h}:${m}:${s}`, inline: true },
                { name: `Temperatura`, value: `${data.current.temperature}ºc`, inline: true },
                { name: `Tempo`, value: `${data.current.weather_descriptions[0]}`, inline: true },
                { name: `Vel do Vento`, value: `${data.current.wind_speed}`, inline: true },
                { name: `Umidade`, value: `${data.current.humidity}%`, inline: true },
                { name: `Nuvens`, value: `${data.current.cloudcover}%`, inline: true }
            )
            .setTimestamp()
            .setThumbnail(data.current.weather_icons[0])
            .setFooter(`Atualmente está fazendo ${data.current.temperature}ºc em ${data.location.name}`, data.current.weather_icons[0])
            .setAuthor(msg.author.tag, avatar);
        await msg.channel.send(embed);
    }
}