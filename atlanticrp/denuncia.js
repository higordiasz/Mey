const Discord = require('discord.js')
const { Reprovado, Aprovado } = require('../controller/wl-controller');
const { OWNER, COLOR } = require('../json/config.json')
const moment = require('moment')

module.exports = {
    name: "denuncia",
    aliases: ["d"],
    description: "Denuncia",
    async execute(msg, args, client) {
        const sleep = async function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        let denuncia = args.join(" ");
        let avatar = msg.author.displayAvatarURL({ format: 'png' });
        let ember = new Discord.MessageEmbed()
            .setTitle("Denuncia - Atlantic City RP")
            .setDescription(`\`\`\`${denuncia}\`\`\``)
            .addFields(
                { name: 'Autor', value: `${msg.member.nickname}`, inline: true }
            )
            .setFooter("Denuncia realizada no horario do servidor: " + moment(moment.now()).format("DD/MM/YYYY hh:mm:ss"))
            .setColor(COLOR)
            .setThumbnail(avatar);
        let channel = await client.channels.fetch("849679640246878239");
        if (channel != null) {
            try { await msg.delete() } catch { }
            let c = await channel.send(ember)
            let d = await msg.channel.send("Denuncia enviada.");
            try {
                await sleep(5000);
                await d.delete();
            } catch { }
        } else {
            let a = await msg.reply("Denuncias indisponivel no momento.")
            await sleep(5000);
            try {
                await a.delete();
                await msg.delete();
            } catch { }
        }
    }
}