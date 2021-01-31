const Discord = require('discord.js')
const config = require('../json/config.json')
const func = require('../commands/functions.js')
const db = require('quick.db')

module.exports = {
    name: "deleterole",
    aliases: ["dr"],
    description: "Deletar reação a uma mensagem para conseguir 1 cargo.",
    async execute(msg, args, client) {
        if (!await func.isADM(msg.member)) return msg.reply('Seu poder não excede 8000!!!');
        //let role = await msg.mentions.roles.first()
        //if (!role) return msg.reply('Mencione o cargo que deseja adicionar a essa mensagem!!')
        if (args.length < 1) return msg.reply('Use o comando corretamente!! \n Em caso de duvida pode usar meu servidor de suporte\`m.discord\` ou use \`m.help\` para ajuda!')
        let message = args[0]
        //if (message == null) return msg.reply('Erro ao localizar a mensagem!!')
        //let emoji = args[1]
        try {
            //await message.react(emoji)
            //let number = db.get(`server.${msg.guild.id}.selfrole.messages.${message.id}.count`) || 0
            //number -= 1
            db.delete(`server.${msg.guild.id}.selfrole.messages.${message}`)
            let m = await msg.channel.send(`\`\`\`Messagem: ${message} | Status: Deletada\`\`\``)
            msg.delete()
            await func.timer(10000)
            m.delete()
        } catch (err) {
            console.log(err);
            //msg.reply('Coloque um emoji valido!!')
            msg.delete()
        }
    }
}