const Discord = require('discord.js')
const { Reprovado, Aprovado } = require('../controller/wl-controller');
const { OWNER, COLOR } = require('../json/config.json')

module.exports = {
    name: "feedmsg",
    aliases: ["fmsg"],
    description: "Modelo feedback de staff",
    async execute(msg, args, client) {
        let avatar = client.user.displayAvatarURL({ format: 'png' });
        if(msg.author.id == OWNER) {
            let ember = new Discord.MessageEmbed()
            .setTitle("Modelo - Atlantic City RP")
            .setDescription("**Utilize esse modelo para dar feedback sobre a nossa Staff!**\n\`\`\`diff\nNome do staff:  ( @staff que atendeu você )\nNota: ( 1 a 10 )\nObservações/descrição: (observação sobre o atendimento) \`\`\`")
            .setFooter("Nos ajude a avaliar a nossa equipe")
            .setColor(COLOR)
            .setThumbnail(avatar);
            await msg.channel.send(ember);
        }
    }
}