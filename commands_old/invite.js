const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Invite this bot to your server",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setAuthor("Invite Klarck", `https://cdn.glitch.com/project-avatar/c40120b3-e6cf-4eb1-a411-32bbc95c7e74.png?1598663938319`)
      .setTitle("Invite me to your server")
      .setDescription("[Click Here](https://ptb.discord.com/api/oauth2/authorize?client_id=737461269279408159&permissions=8&scope=bot)")
      .setColor("#ffffff")
      .setThumbnail(`https://cdn.glitch.com/project-avatar/c40120b3-e6cf-4eb1-a411-32bbc95c7e74.png?1598663938319`);

  
    

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
