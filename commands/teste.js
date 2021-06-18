const Discord = require("discord.js");
const config = require('../json/config.json')
const description = require('../json/comandos.json');

module.exports = {
    name: "testee",
    aliases: ["testembed", "teste"],
    description: "Display all commands and descriptions",
    async execute(msg, args, client) {
        let avatar = client.user.displayAvatarURL({ format: 'png' })
        const embed = new Discord.MessageEmbed()
            .setTitle('Balanço geral!')
            .setColor(config.COLOR)
            .addFields(
                { name: `Nome`, value: `555555\ndias\nandersonzoiosdjf\ndifjufufhvyfgvuhfufvf`, inline: true },
                { name: `Limpo`, value: `55555\n45124587\n45424242424287452\n451`, inline: true },
                { name: `Sujo`, value: `55555\n45124587\n4587451145224452\n451`, inline: true }
            )
            .setTimestamp()
            .setFooter('Cofre da Empresa: 451245')
            .setAuthor('TopGear System', avatar);
        //await msg.channel.send(embed)
        let channelID = args[0];
        let msgID = args[1];
        let channel = await client.channels.cache.get(channelID);
        let mes = await channel.messages.fetch(msgID);
        await mes.edit(embed);
    }
}