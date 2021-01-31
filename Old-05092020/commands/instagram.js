const Discord = require('discord.js')
const Instagram = require('instagram-web-api')
const insta = new Instagram({ username: 'higordiasz', password: '999446959hdz' })
const func = require('./functions')

module.exports = {
    name: "instagram",
    aliases: ["ig", "insta"],
    description: "Mostra o instagram da pessoa desejada.",
    async execute(msg, args, client) {
        if (!args[0]) return;
        let instagram;
        try {
            instagram = await insta.getUserByUsername({ username: args[0] })
            let avatar = await instagram.profile_pic_url_hd
            let name = await instagram.full_name
            let follow = instagram.edge_follow.count
            let followed = await instagram.edge_followed_by.count
            let biography = await instagram.biography
            let lastpost = await instagram.edge_owner_to_timeline_media.edges[0].node.display_url
            let description = await instagram.edge_owner_to_timeline_media.edges[0].node.accessibility_caption
            let embed = new Discord.MessageEmbed()
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: 'png' }))
                .setColor('#ff0000')
                .setDescription(`${biography}`)
                .setImage(lastpost)
                .setThumbnail(avatar)
                .setTitle(name)
                .addFields(
                    { name: 'Seguindo', value: `${follow}`, inline: true },
                    { name: 'Seguidores', value: `${followed}`, inline: true }
                )
                .setFooter(description);
            msg.reply(embed)
            msg.delete()
        } catch {
            let m = msg.reply(`Informe o @ do usuario corretamente!!`)
            await func.timer(20000)
            msg.delete();
            m.delete()
        }

        //console.log(instagram)
        //console.log(instagram.edge_owner_to_timeline_media.edges[0].node)
        /*instagram.edge_owner_to_timeline_media.edges.forEach(element => {
        console.log(element.node.display_url)        
        });*/

    }
}