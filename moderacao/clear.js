module.exports = {
    name: "clear",
    aliases: ["cl"],
    description: "Comando Clear",
    async execute(msg, args, client) {
        if (!msg.guild.me.hasPermission('MANAGE_MESSAGES')) return msg.channel.send('Não tenho poder suficiente para tal...');
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send('Oque está tentando fazer ?!. Você não tem permissão para tal!!');
        let quantidade = msg.content.split(" ");
        if (isNaN(quantidade[1]) && quantidade[1] <= 0) return msg.channel.send('Me fale a quantitade de mensagens que deseja apagar!');
        if (quantidade[1] >= 100) {
            msg.delete();
            msg.channel.bulkDelete(99, true);
        } else {
            msg.delete();
            msg.channel.bulkDelete(quantidade[1], true);
        }
    }
}