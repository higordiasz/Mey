const Discord = require('discord.js');
const { PORCENT, COLOR, OWNER, rwl } = require('../json/config-wl.json');
const { LiberarID } = require('../controller/wl-controller');

module.exports = {
    name: "liberarid",
    aliases: ["lid"],
    description: "Liberar ID",
    async execute(msg, args, client) {
        if (!msg.member.roles.cache.has(rwl)) return;
        let id = args[0];
        let avatar = client.user.displayAvatarURL({ format: 'png' });
        let embed = new Discord.MessageEmbed()
            .setTitle("Liberar WL - Confirmar")
            .setColor(COLOR)
            .setDescription(`Tem certeza que deseja liberar o id ${id} ?`)
            .setFooter("Atlantic City", avatar);
        let reactions = ['✅', '❎'];
        let m = await msg.channel.send(msg.author, embed);
        await m.react(reactions[0]);
        await m.react(reactions[1]);
        const filter = (reaction, user) => user.id === msg.author.id;
        const collector = m.createReactionCollector(filter, { time: 60000, max: 1 })
        collector.on('end', collect => {
            try {
                m.delete();
            } catch { }
        })
        collector.on('collect', async (emoji) => {
            try {
                switch (emoji._emoji.name) {
                    case reactions[0]:
                        await LiberarID(id);
                        break;
                    case reactions[1]:
                        try { await m.delete } catch { }
                        break;
                    default:
                        break;
                }
            } catch (e) { console.log(e) }
        })
    }
}