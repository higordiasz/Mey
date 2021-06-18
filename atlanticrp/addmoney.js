const Discord = require('discord.js');
const { PORCENT, COLOR, OWNER } = require('../json/config-wl.json');
const { AddMoney } = require('../controller/db-controller');
const { LogAddMoedas } = require('../controller/log-controller');

module.exports = {
    name: "addmoedas",
    aliases: ["addmd"],
    description: "Adicionar Moedas",
    async execute(msg, args, client) {
        if (!msg.member.roles.cache.has("848051532397281300")) return;
        let id = args[0];
        let qtdText = args[1];
        let qtd = parseInt(qtdText, 10);
        let avatar = client.user.displayAvatarURL({ format: 'png' });
        let embed = new Discord.MessageEmbed()
            .setTitle("Adicionar Moedas - Confirmar")
            .setDescription(`Tem certeza que deseja adicionar ${qtd} moedas para o ID '${id}' ?`)
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
                        //Confirmou
                        await AddMoney(id, qtd);
                        LogAddMoedas(msg, args, client, msg.author, id, qtd);
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