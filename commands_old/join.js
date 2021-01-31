const { MessageEmbed } = require("discord.js");

module.exports = {

  name: "join",

  description: "Join to Voice Channel",

  execute(message) {

    const { channel } = message.member.voice

    

    if (!channel) return message.reply("Please Join The Voice Channel")

    

    channel.join().then((connection) => {
      const dispatcher = connection.play("https://cdn.glitch.com/project-avatar/c40120b3-e6cf-4eb1-a411-32bbc95c7e74.png?1598663938319");
})
    message.channel.send(`Joined ****${channel.name}****`)

  }

};