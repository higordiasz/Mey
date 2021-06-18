const Discord = require('discord.js')
const { Reprovado, Aprovado } = require('../controller/wl-controller');
const { OWNER, COLOR } = require('../json/config.json')

module.exports = {
    name: "denunciamsg",
    aliases: ["dmsg"],
    description: "Modelo denuncia",
    async execute(msg, args, client) {
        let avatar = client.user.displayAvatarURL({ format: 'png' });
        if(msg.author.id == OWNER) {
            let ember = new Discord.MessageEmbed()
            .setTitle("Denuncia - Atlantic City RP")
            .setDescription("**Para realizar uma denuncia utilize o seguinte comando:**\n\`\`\`diff\n!denuncia (descreva a sua denuncia na mesma mensagem, importante conter link de video ou print como prova)\`\`\`")
            .setFooter("Comando para realizar uma denuncia")
            .setColor(COLOR)
            .setThumbnail(avatar);
            await msg.channel.send(ember);
        }
    }
}