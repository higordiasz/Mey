const Discord = require('discord.js')
const { Reprovado, Aprovado } = require('../controller/wl-controller');
const { OWNER, COLOR } = require('../json/config.json')

module.exports = {
    name: "sedwl",
    aliases: ["swl"],
    description: "Testar o reprovado",
    async execute(msg, args, client) {
        let avatar = client.user.displayAvatarURL({ format: 'png' });
        if(msg.author.id == OWNER) {
            let ember = new Discord.MessageEmbed()
            .setTitle("Whitelist Atlantic City RP")
            .setDescription("**Sistema de whitelist automático !!**\n\`\`\`diff\n!whitelist\`\`\`")
            .setFooter("Após o comando será criado uma nova sala        ")
            .setColor(COLOR)
            .setThumbnail(avatar);
            await msg.channel.send(ember);
        }
    }
}