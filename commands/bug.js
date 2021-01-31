const Discord = require('discord.js')
const config = require('../json/config.json')

module.exports = {
    name: "bug",
    aliases: [],
    description: "Reportar um bug na mey.",
    async execute(msg, args, client) {
        try {
            if (!args[1]) return msg.reply(`Envie o comando corretamente!! \`m.bug <comando> <descrição do bug>\``);
            let commandName = args.shift().toLowerCase();
            let command =
                client.commands.get(commandName) ||
                client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) return msg.reply(`O comando ${commandName} não existe, por favor use o comando de maneira correta!!`);
            let description = args.join(" ")
            if (!description) msg.reply(`Descreva o bug junto com o comando para que eu possa corrigilo!! \`m.bug <comando> <descrição do bug>\``)
            let enviar =await client.channels.fetch('753826836974403628') ||await client.users.fetch(config.OWNER)
            if (!enviar) return;
            let embed = new Discord.MessageEmbed()
                .setAuthor(`Bug Report`)
                .setColor(config.COLOR)
                .setDescription(`Um bug foi reportado.`)
                .addFields(
                    { name: `Autor`, value: `${msg.author.tag}`, inline: true },
                    { name: `Coamando`, value: `${commandName}`, inline: true },
                    { name: `Descrição`, value: `${description}`, inline: true }
                )
            enviar.send(`Reportado por: ${msg.author.tag}`, embed)
            msg.channel.send(`\`\`\`Obrigada ${msg.author.tag} por reportar o bug!!, ja enviei para o meu suporte. >w<\`\`\``)
        } catch (err) {
            console.log(`Erro no bug report: ` + err)
        }
    }
}