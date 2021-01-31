const Discord = require('discord.js')
const config = require('../json/config.json')
const func = require('./functions.js')

module.exports = {
    name: "socar",
    aliases: ["soco"],
    description: "Dar um soco na pessoa selecionada.",
    async execute(msg, args, client) {
        let userm = msg.mentions.users.first();
        if (!userm) {
            return message.reply('lembre-se de mencionar um usuário válido para socar!');
        }
        var kittenAlbum = 'TVKjPCx';
        let album = await func.ialbum(kittenAlbum)
        if (album.success) {
            let images = album.data.images;
            let numimg = parseInt(album.data.images_count);
            let i = await func.rand(numimg)
            let url = images[i].link;
            let avatar = msg.author.displayAvatarURL({ format: 'png' });
            const embed = new Discord.MessageEmbed()
                .setTitle('Socou!!')
                .setColor('#000000')
                .setImage(url)
                .setDescription(`${msg.author} socou ${userm}`)
                .setTimestamp()
                .setThumbnail(avatar)
                .setFooter(`${userm.tag} acaba de levar um soco do usuario ${msg.author.tag}!!`)
                .setAuthor(msg.author.tag, avatar);
            msg.channel.send(embed);
            if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) return msg.delete();
        } else {
            console.log('erro')
        }
    }
}