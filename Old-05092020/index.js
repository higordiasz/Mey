const express = require('express');
const app = express();
const db = require("quick.db");
const config = require('./json/config.json')
const token = require('./json/token.json')
const moment = require('moment')
process.env.TOKEN = token.TOKEN
//process.env.YOUTUBE_API_KEY = "AIzaSyDpIhgKW_j4F9toAnfgLbnACPOgdyCTMrY"
process.env.YOUTUBE_API_KEY = config.YOUTUBE_API_KEY
process.env.PREFIX = config.PREFIX
/*
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});
app.get("/thanks", (request, response) => {
  response.sendfile(__dirname + "/t.html");
});
*/
//listener
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});



require("./uptimer.js");
const pe = process.env
if (!pe.TOKEN) return console.log("Oops! You aren't put your Bots Token! \nTry again later!");
if (!pe.YOUTUBE_API_KEY) console.log("Oops! You aren't Insert Youtube API Key! \n\nYou can only play songs from youtube by sending Links Only!\nLearn How to get Youtube API key at: https://youtu.be/WUwzx46KxjM");
if (!pe.PREFIX) return console.log("You aren't Insert Your bot Prefix! Please Insert it!");
/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const Discord = require('discord.js')
const { readdirSync } = require("fs");
const numbertowords = require('number-to-words')
const { join } = require("path");
const { min } = require('moment');
require("dotenv").config();
const { TOKEN, PREFIX } = process.env;

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();

/**
 * Client Events
 
client.on("ready", () => {
  function randomStatus() {
    let status = ["🔨 Creator Wiul", "🥰 Niko Niko NII", "💖 Music", "🔔 klhelp for commands!", "🌺 Klaarrrck! >.<", "☀️ Haaaaappy"]
    let rstatus = Math.floor(Math.random() * status.length);

    // client.user.setActivity(status[rstatus], {type: "WATCHING"}); 
    // You can change the "WATCHING" into STREAMING, LISTENING, and PLAYING.
    // Example: streaming

    client.user.setActivity(status[rstatus], { type: "STREAMING", url: "https://www.twitch.tv/jonzinhuu_" });
  }; setInterval(randomStatus, 10000) // Time in ms. 30000ms = 30 seconds. Min: 20 seconds, to avoid ratelimit.

  console.log('Estou Online.')
})
*/
client.on('ready', () => {
  console.log(`Bot foi iniciado com sucesso`);

  var tabela = [
    { name: `🤖Utilize ${config.PREFIX}ajuda para obter meus comandos, >w<!`, type: 'PLAYING' },
    { name: '💻Desenvolvida carinhosamente por Dias e Wiul >w<', type: 'STREAMING', url: 'https://twitch.tv/jonzinhuu_' },
    { name: `🤖Use ${config.PREFIX}link e poderei entrar em seu servidor!.`, type: 'LISTENING' },
    { name: '✨Eu sou a Mey! >.<', type: 'WATCHING' },
    { name: '😍Vamos ser amiguinhos(as)?', type: 'STREAMING', url: 'https://twitch.tv/jonzinhuu_' }
  ];

  function setStatus() {
    var altstatus = tabela[Math.floor(Math.random() * tabela.length)]
    client.user.setActivity(altstatus)
  }
  setStatus();
  setInterval(() => setStatus(), 20000)
});

client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `Por favor espere ${timeLeft.toFixed(1)} segundos para depois utilizar \`${command.name}\` comando.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      message.reply("Estou com problema para executar esse comando.").catch(console.error);
    }
  }
});

client.on('guildCreate', async guild => {
  try {
    let channel = await client.channels.fetch(config.channelprincipal);
    let embed = new Discord.MessageEmbed()
      .setTitle(`**Me Adicionaram!**`)
      .setDescription(`Proprietario: ${guild.owner.user.tag}\nRegião: ${guild.region}\n Membros: ${guild.memberCount}\n Criado em: ${moment(guild.createdAt).format('LLL')}`)
      .setColor('#ff0000')
      .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
      .setAuthor(client.user.tag, client.user.displayAvatarURL({ format: 'png' }))
    channel.send(`\`${guild.name} [${guild.id}]\``, embed)
  } catch (err) {
    console.log('Erro ao enviar mensagem para o channel de log: ', err)
  }
})

client.on('guildDelete', async guild => {
  try {
    let channel = await client.channels.fetch(config.channelprincipal);
    let embed = new Discord.MessageEmbed()
      .setTitle(`**Me Removeram!**`)
      .setDescription(`Proprietario: ${guild.owner.user.tag}\nRegião: ${guild.region}\n Membros: ${guild.memberCount}\n Criado em: ${moment(guild.createdAt).format('LLL')}`)
      .setColor('#ff0000')
      .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
      .setAuthor(client.user.tag, client.user.displayAvatarURL({ format: 'png' }))
    channel.send(`\`${guild.name} [${guild.id}]\``, embed)
  } catch (err) {
    console.log('Erro ao enviar mensagem para o channel de log: ', err)
  }
})

client.on('voiceStateUpdate', (oldState, newState) => {

  if (db.get(`config_${oldState.guild.id}.voice`) == true) {
    let user = client.users.cache.find(user => user.id == newState.id)
    if (user.bot) return;
    if ((oldState.channelID == null) && (newState.channelID != null)) {
      /*
      let timer = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      var x = new moment()
      await timer(20000)
      var y = new moment()
      var duration = moment.duration(y.diff(x))
      console.log(duration)
      */
      db.set(`voice_${newState.guild.id}.voice.${user.id}.entrada`, new moment())
    } else {
      if ((newState.channelID == null) && (oldState.channelID != null)) {
        if (!db.get(`voice_${newState.guild.id}.voice.${user.id}.entrada`)) return;
        let d_entrada = db.get(`voice_${newState.guild.id}.voice.${user.id}.entrada`)
        let d_atual = new moment()
        let dif = moment.duration(d_atual.diff(d_entrada))
        let milliseconds = db.get(`voice_${newState.guild.id}.voice.${user.id}.milliseconds`) || 0
        let seconds = db.get(`voice_${newState.guild.id}.voice.${user.id}.seconds`) || 0
        let minutes = db.get(`voice_${newState.guild.id}.voice.${user.id}.minutes`) || 0
        let hours = db.get(`voice_${newState.guild.id}.voice.${user.id}.hours`) || 0
        let days = db.get(`voice_${newState.guild.id}.voice.${user.id}.days`) || 0
        milliseconds += dif._data.milliseconds
        seconds += dif._data.seconds
        minutes += dif._data.minutes
        hours += dif._data.hours
        days += dif._data.days
        if (milliseconds > 999) {
          milliseconds -= 1000
          seconds += 1
        }
        if (seconds > 59) {
          seconds -= 60
          minutes += 1
        }
        if (minutes > 59) {
          minutes -= 60
          hours += 1
        }
        if (hours > 23) {
          hours -= 24
          days += 1
        }
        db.set(`voice_${newState.guild.id}.voice.${user.id}.tag`, user.tag)
        db.add(`voice_${newState.guild.id}.voice.${user.id}.milliseconds_total`, dif._milliseconds)
        db.set(`voice_${newState.guild.id}.voice.${user.id}.milliseconds`, milliseconds)
        db.set(`voice_${newState.guild.id}.voice.${user.id}.seconds`, seconds)
        db.set(`voice_${newState.guild.id}.voice.${user.id}.minutes`, minutes)
        db.set(`voice_${newState.guild.id}.voice.${user.id}.hours`, hours)
        db.set(`voice_${newState.guild.id}.voice.${user.id}.days`, days)
        db.delete(`voice_${newState.guild.id}.voice.${user.id}.entrada`)
      }
    }
  }
})

client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
  if (!db.fetch(`user_${msg.author.id}`)) {
    db.set(`user_${msg.author.id}`, { level: 1, exp: 2, ataque: 15, magia: 10, defesa: 5, speed: 5, balance: 1000, ficha: 'azul', name: `${msg.author.tag}`, avatar: `${msg.author.displayAvatarURL({ format: 'png' })}`, vida: 200, v_atual: 200 })
    console.log(`Membro: ${msg.author.tag} Registrado. Servidor: ${msg.guild.name} ID: ${msg.guild.id} Owner: ${msg.guild.owner}`)
  } else {
    try {
      let pointsAdd = Math.floor(db.get(`user_${msg.author.id}.level`) / 10) + 6;
      db.add(`user_${msg.author.id}.exp`, pointsAdd)
      let userprofile = db.get(`user_${msg.author.id}`)
      let nextlevel = Math.pow(2, userprofile.level) * 50
      if (userprofile.exp >= nextlevel) {
        db.add(`user_${msg.author.id}.balance`, 100)
        db.add(`user_${msg.author.id}.level`, 1)
        if (db.get(`user_${msg.author.id}.level`) % 2 == 0) {
          db.add(`user_${msg.author.id}.speed`, 1)
          db.add(`user_${msg.author.id}.ataque`, 3)
          db.add(`user_${msg.author.id}.defesa`, 2)
          db.add(`user_${msg.author.id}.magia`, 2)
        }
        db.add(`user_${msg.author.id}.vida`, 10)
      }
    } catch (err) {
      console.log(err)
    }
  }
})


client.on('guildMemberAdd', async membro => {
  try {
    let entrada = await db.get(`server.${membro.guild.id}.chat.entrada`) || 0
    let cargoe = await db.get(`server.${membro.guild.id}.chat.cargoentrada`) || 0
    if (entrada != 0) {
      if (cargoe != 0) {
        let canal = await client.channels.fetch(entrada);
        let cargo = await membro.guild.roles.fetch(cargoe);
        let avatar = membro.user.displayAvatarURL({ dynamic: true });
        const embed = new Discord.MessageEmbed()
          .setTitle('BEM-VINDO')
          .setColor(config.COLOR)
          .setDescription(`${membro.user}, seja bem-vindo(a) ao servidor.\nContamos agora com ${membro.guild.memberCount} membros no servidor.`)
          .setTimestamp()
          .setThumbnail(avatar)
          .setFooter('Bem-vindo ao Servidor.')
          .setAuthor(membro.user.tag, avatar);

        canal.send(embed)
        membro.roles.add(cargo)
      } else {
        let canal = await client.channels.fetch(entrada);
        let avatar = membro.user.displayAvatarURL({ dynamic: true });
        const embed = new Discord.MessageEmbed()
          .setTitle('BEM-VINDO')
          .setColor(config.COLOR)
          .setDescription(`${membro.user}, seja bem-vindo(a) ao servidor.\nContamos agora com ${membro.guild.memberCount} membros no servidor.`)
          .setTimestamp()
          .setThumbnail(avatar)
          .setFooter('Bem-vindo ao Servidor.')
          .setAuthor(membro.user.tag, avatar);

        canal.send(embed)
      }
    } else {
      if (cargo != 0) {
        let cargo = await membro.guild.roles.fetch(cargo);
        membro.roles.add(cargo)
      }
    }
  } catch (err) {
    console.log('Erro memberjoin: ' + err)
  }
})

client.on('guildMemberRemove', async membro => {
  try {
    let leave = db.get(`server.${membro.guild.id}.chat.leave`) || 0
    if (leave == 0) return;
    let avatar = membro.user.displayAvatarURL({ dynamic: true });
    let canal = await client.channels.fetch(leave);
    const embed = new Discord.MessageEmbed()
      .setTitle('SAIDA')
      .setColor(config.COLOR)
      .setDescription(`${membro.user.tag} acaba de nos deixar.\nContamos agora com ${membro.guild.memberCount} membros no servidor.`)
      .setTimestamp()
      .setThumbnail(avatar)
      .setFooter('Nos vemos numa próxima vez.')
      .setAuthor(membro.user.tag, avatar);

    canal.send(embed)
  } catch (err) {
    console.log(' Erro ao sair o membro do channel: ' + err)
  }
})

client.on('guildMemberRemove', async membro => {
  try {
    let contadorID = db.get(`server.${membro.guild.id}.chat.contado`) || 0
    if (contadorID == 0) return;
    let canal = await client.channels.fetch(contadorID);
    let membrosCount = `${membro.guild.memberCount}`;
    let membrosArray = new Array();
    let membrosSplit = membrosCount.split("");
    let contador = "";
    for (let i = 0; i < membrosCount.length; i++) {
      membrosArray[i] = numbertowords.toWords(membrosSplit[i]);
      contador += ':' + membrosArray[i] + ':';
    }
    canal.setTopic(`Temos atualmente ${contador} Membros no servidor.`)
  } catch (err) {
    console.log('Erro Contador Remove: ' + err)
  }
})

client.on('guildMemberAdd', async membro => {
  try {
    let contadorID = db.get(`server.${membro.guild.id}.chat.contado`) || 0
    if (contadorID == 0) return;
    let canal = await client.channels.fetch(contadorID);
    let membrosCount = `${membro.guild.memberCount}`;
    let membrosArray = new Array();
    let membrosSplit = membrosCount.split("");
    let contador = "";
    for (let i = 0; i < membrosCount.length; i++) {
      membrosArray[i] = numbertowords.toWords(membrosSplit[i]);
      contador += ':' + membrosArray[i] + ':';
    }
    canal.setTopic(`Temos atualmente ${contador} Membros no servidor.`)
  } catch (err) {
    console.log('Erro no contador Add: ', err)
  }
})