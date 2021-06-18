const Discord = require('discord.js')
const { Reprovado, Aprovado } = require('../controller/wl-controller');
const { OWNER, COLOR } = require('../json/config.json')

module.exports = {
    name: "sendlinkd",
    aliases: ["sendld"],
    description: "Enviar link do discord",
    async execute(msg, args, client) {
        let avatar = client.user.displayAvatarURL({ format: 'png' });
        if(msg.author.id == OWNER) {
            let link = args[0];
            let ember = new Discord.MessageEmbed()
            .setTitle("Atlantic City RP")
            .setDescription(`**Utiliza o link abaixo para entrar em nosso discord.**\n\`\`\`diff\n${link}\`\`\``)
            .setFooter("Se divirta em nossa cidade!!")
            .setColor(COLOR)
            .setThumbnail(avatar);
            await msg.channel.send(ember);
        }
    }
}