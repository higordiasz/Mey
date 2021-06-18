const Discord = require('discord.js')
const { Reprovado, Aprovado } = require('../controller/wl-controller');
const { OWNER, COLOR } = require('../json/config.json')

module.exports = {
    name: "sendserver",
    aliases: ["sdserver"],
    description: "Mensagem com o IP do servidor",
    async execute(msg, args, client) {
        let avatar = client.user.displayAvatarURL({ format: 'png' });
        if(msg.author.id == OWNER) {
            let server = args[0];
            let ember = new Discord.MessageEmbed()
            .setTitle("Atlantic City RP")
            .setDescription(`**Para conectar no servidor abra o FiveM, aperte a tecla F8 e digite o código abaixo.**\n\`\`\`diff\n${server}\`\`\``)
            .setFooter("Se divirta em nossa cidade!!")
            .setColor(COLOR)
            .setThumbnail(avatar);
            await msg.channel.send(ember);
        }
    }
}