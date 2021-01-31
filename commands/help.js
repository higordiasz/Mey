const Discord = require("discord.js");
const config = require('../json/config.json')
const description = require('../json/comandos.json');

module.exports = {
  name: "help",
  aliases: ["h", "ajuda"],
  description: "Display all commands and descriptions",
  async execute(msg, args, client) {
    if (!args[0]) {
      let avatar = client.user.displayAvatarURL({ format: 'png' })
      const embed = new Discord.MessageEmbed()
        .setTitle('Lista de comandos!')
        .setColor(config.COLOR)
        .addFields(
          { name: `Moderador`, value: `\`${config.PREFIX}help moderador\``, inline: true },
          { name: `Level`, value: `\`${config.PREFIX}help level\``, inline: true },
          { name: `Diversos`, value: `\`${config.PREFIX}help diversos\``, inline: true },
          { name: `Musica`, value: `\`${config.PREFIX}help musica\``, inline: true },
          { name: `RPG`, value: `\`${config.PREFIX}help rpg\``, inline: true },
          { name: `Suporte`, value: `\`${config.PREFIX}help suporte\``, inline: true },
          { name: `Rádio`, value: `\`${config.PREFIX}help radio\``, inline: true }
        )
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('Lista de comandos.')
        .setAuthor('Mey - Comandos', avatar);
      await msg.channel.send(embed)
    } else {
      let avatar = client.user.displayAvatarURL({ format: 'png' });
      let listFun = description.diversao
      let listAdm = description.adm
      let listGame = description.level
      let listSup = description.suporte
      let listMusic = description.musica
      let listRpg = description.rpg
      let listRadio = description.radio
      let Fun = ""
      let Adm = ""
      let Game = ""
      let Sup = ""
      let rpg = ""
      let Music = ""
      let Rad = ""
      Object.keys(listFun).forEach(chave => {
        Fun += `**${chave}**\n${listFun[chave]} \n\n`
      });
      Object.keys(listAdm).forEach(chave => {
        Adm += `**${chave}**\n ${listAdm[chave]} \n\n`
      });
      Object.keys(listGame).forEach(chave => {
        Game += `**${chave}**\n ${listGame[chave]} \n\n`
      });
      Object.keys(listSup).forEach(chave => {
        Sup += `**${chave}**\n ${listSup[chave]} \n\n`
      });
      Object.keys(listMusic).forEach(chave => {
        Music += `**${chave}**\n ${listMusic[chave]} \n\n`
      });
      Object.keys(listRpg).forEach(chave => {
        rpg += `**${chave}**\n ${listRpg[chave]} \n\n`
      });
      Object.keys(listRadio).forEach(chave => {
        Rad += `**${chave}**\n ${listRadio[chave]} \n\n`
      });
      switch (args[0].toLowerCase()) {
        case 'moderador':
          const embed = new Discord.MessageEmbed()
            .setTitle('Moderador!')
            .setColor(config.COLOR)
            .setDescription(`${Adm}`)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('Lista de comandos.')
            .setAuthor('Mey - Comandos Moderador', avatar);
          await msg.channel.send(embed)
          break;
        case 'level':
          const embed2 = new Discord.MessageEmbed()
            .setTitle('Level!')
            .setColor(config.COLOR)
            .setDescription(`${Game}`)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('Lista de comandos.')
            .setAuthor('Mey - Comandos de Level', avatar);
          await msg.channel.send(embed2)
          break;
        case 'diversos':
          const embed3 = new Discord.MessageEmbed()
            .setTitle('Diversos!')
            .setColor(config.COLOR)
            .setDescription(`${Fun}`)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('Lista de comandos.')
            .setAuthor('Mey - Comandos Diversos', avatar);
          await msg.channel.send(embed3)
          break;
        case 'suporte':
          const embed4 = new Discord.MessageEmbed()
            .setTitle('Suporte!')
            .setColor(config.COLOR)
            .setDescription(`${Sup}`)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('Lista de comandos.')
            .setAuthor('Mey - Comandos de Suporte', avatar);
          await msg.channel.send(embed4)
          break;
        case 'musica':
          const embed5 = new Discord.MessageEmbed()
            .setTitle('Musica!')
            .setColor(config.COLOR)
            .setDescription(`${Music}`)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('Lista de comandos.')
            .setAuthor('Mey - Comandos de Musica', avatar);
          await msg.channel.send(embed5)
          break;
        case 'rpg':
          const embed6 = new Discord.MessageEmbed()
            .setTitle('RPG!')
            .setColor(config.COLOR)
            .setDescription(`${rpg}`)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('Lista de comandos.')
            .setAuthor('Mey - Comandos RPG', avatar);
          await msg.channel.send(embed6)
          break;
        case 'radio':
          const embed7 = new Discord.MessageEmbed()
            .setTitle('Rádio!')
            .setColor(config.COLOR)
            .setDescription(`${Rad}`)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('Lista de comandos.')
            .setAuthor('Mey - Comandos de Rádio', avatar);
          await msg.channel.send(embed7)
          break;
        default:
          await msg.channel.send(`Envie o comando corretamente!`)
          break;
      }
    }





    /*
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setAuthor("Klarck Command", `https://cdn.glitch.com/project-avatar/c40120b3-e6cf-4eb1-a411-32bbc95c7e74.png?1598663938319`)
      .setTitle("Command List")
      .setDescription("List of all commands")
      .setColor("#ffffff")
      .setThumbnail(`https://cdn.glitch.com/project-avatar/c40120b3-e6cf-4eb1-a411-32bbc95c7e74.png?1598663938319`);

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        cmd.description,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
    */
  }
};
