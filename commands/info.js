const Discord = require('discord.js')
const config = require('../json/config.json')

module.exports = {
    name: "info",
    aliases: ["stats", "i", "userinfo", "ui"],
    description: "Informações do usuario.",
    async execute(message, args, client) {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = " online";
                break;
            case "dnd":
                status = " dnd";
                break;
            case "idle":
                status = " idle";
                break;
            case "offline":
                status = " offline";
                break;
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`🌐 Status do usuário: ${user.user.username} `)
            .setColor(config.COLOR)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                {
                    name: "Nome do Usuário: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ TAG: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: "🆔 ID: ",
                    value: user.user.id,
                },
                {
                    name: "🟢 Status atual: ",
                    value: status,
                    inline: true
                },
                {
                    name: "🎮/🎧 Atividade: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `O usuário não está jogando um jogo!`,
                    inline: true
                },
                {
                    name: '👦🏻 Avatar link: ',
                    value: `[Click Here](${user.user.displayAvatarURL()})`
                },
                {
                    name: '📅 Data de Criação: ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: '✅ Data de Entrada: ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: '🏆 Cargos Usuários: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                }
            )

        await message.channel.send(embed)
    }
}