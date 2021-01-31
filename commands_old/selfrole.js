const Discord = require('discord.js')
const config = require('../json/config.json')
const func = require('./functions.js')
const db = require('quick.db')

module.exports = {
    name: "addrole",
    aliases: ["ar"],
    description: "Adicionar reação a uma mensagem para conseguir 1 cargo.",
    async execute(msg, args, client) {
        if (!await func.isADM(msg.member)) return msg.reply('Seu poder não excede 8000!!!');
        let role = await msg.mentions.roles.first()
        if (!role) return msg.reply('Mencione o cargo que deseja adicionar a essa mensagem!!')
        if (args.length < 3) return msg.reply('Use o comando corretamente!! \n Em caso de duvida pode usar meu servidor de suporte\`m.discord\` ou use \`m.help\` para ajuda!')
        let message = await msg.channel.messages.fetch(args[0]) || null
        if (message == null) return msg.reply('Erro ao localizar a mensagem!!')
        let emoji = args[1]
        try {
            await message.react(emoji)
            let number = db.get(`server.${msg.guild.id}.selfrole.messages.${message.id}.count`) || 0
            number += 1
            db.set(`server.${msg.guild.id}.selfrole.messages.${message.id}.count`, number)
            db.set(`server.${msg.guild.id}.selfrole.messages.${message.id}.emoji${number}.emoji`, emoji)
            db.set(`server.${msg.guild.id}.selfrole.messages.${message.id}.emoji${number}.creator`, msg.author.id)
            db.set(`server.${msg.guild.id}.selfrole.messages.${message.id}.emoji${number}.cargo`, role.id)
            db.set(`server.${msg.guild.id}.selfrole.messages.${message.id}.emoji${number}.id`, message.id)
            let m = await msg.channel.send(`\`\`\`Messagem: ${message.id} | Emoji: ${emoji} | Autor: ${msg.author.tag} | Cargo: ${role.name} | Status: Sucesso\`\`\``)
            msg.delete()
            await func.timer(10000)
            m.delete()
        } catch (err) {
            console.log(err);
            msg.reply('Coloque um emoji valido!!')
            msg.delete()
        }
    }
}