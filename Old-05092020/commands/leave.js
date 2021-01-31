const { MessageEmbed } = require("discord.js");

module.exports = {

  name: "leave",

  description: "Leave the Voice Channel",

  execute(message) {

    const { channel } = message.member.voice

    

    if (!channel) return message.reply("Please Join The Voice Channel")

    

    channel.leave();

    message.channel.send(`Leaved ****${channel.name}****`)

  }

};