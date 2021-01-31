module.exports = {
    name: "desmuteall",
    aliases: ["dmta", "dmt"],
    description: "Desmute all",
    async execute(msg, args, client) {
        if (!msg.member.voice.channel) return msg.channel.send("Voce deve estar conectado em um canal de voz para usar este comando.");
        if (!msg.guild.me.hasPermission('MUTE_MEMBERS')) return msg.channel.send('Não tenho poder suficiente para tal...');
        if (!msg.member.hasPermission('MUTE_MEMBERS')) return msg.channel.send('Oque está tentando fazer ?!. Você não tem permissão para tal!!');
        let channel = msg.member.voice.channel.members.array();
        if (channel.length <= 1) return msg.reply('Não pode usar este comando estando sozinho.');
        for (let i = 0; i < channel.length; i++) {
            if (!channel[i].hasPermission('MUTE_MEMBERS')) {
                channel[i].voice.setMute(false);
            }
        }
    }
}