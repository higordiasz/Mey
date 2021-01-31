const Discord = require('discord.js')
const imgur = require('imgur')
const fetch = require('node-fetch')
const db = require('quick.db')
const config = require('../json/config.json')
const { match } = require('ffmpeg-static')
const moment = require('moment')
let connectionDispatcher;

module.exports = {
    args: async function (args) {
        let text = args.join(" ")
        return text;
    },
    isADM: async function (member) {
        return (member.hasPermission('ADMINISTRATOR'));
    },
    rsend: async function (msg, message) {
        return msg.reply(message);
    },
    send: async function (msg, message) {
        return msg.channel.send(message);
    },
    timer: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    ialbum: async function (album) {
        let a = await imgur.getAlbumInfo(album)
            .then(function (json) {
                return json;
            })
            .catch(function (err) {
                console.error(err.message);
                return;
            });
        return a;
    },
    rand: async function (max) {
        return Math.floor(Math.random() * max)
    },
    returnmonster: function (level) {
        while (level % 5 != 0) {
            level += 1;
        }
        try {
            let categoria = Math.trunc(level / 5)
            let monstros;
            for (let i = 1; i <= categoria; i++) {
                if (db.fetch(`rpg.monster.dados.categoria.${i}`)) {
                    monstros = db.get(`rpg.monster.dados.categoria.${i}`)
                }
            }
            //let monstros = db.get(`rpg.monster.dados.categoria.${categoria}`)
            let position = Math.floor(Math.random() * monstros.length)
            let monster = db.get(`rpg.monster.dados.${monstros[position]}`)
            let porcentagem = Math.floor(Math.random() * 100)
            let lvl = Math.floor(((monster.level_max - monster.level_min) * porcentagem) / 100) + parseInt(monster.level_min)
            let vida = Math.floor(((monster.vida_max - monster.vida_min) * porcentagem) / 100) + parseInt(monster.vida_min)
            let xp = Math.floor(((monster.xp_max - monster.xp_min) * porcentagem) / 100) + parseInt(monster.xp_min)
            let ataque = Math.floor(((monster.ataque_max - monster.ataque_min) * porcentagem) / 100) + parseInt(monster.ataque_min)
            let defesa = Math.floor(((monster.defesa_max - monster.defesa_min) * porcentagem) / 100) + parseInt(monster.defesa_min)
            let speed = Math.floor(((monster.speed_max - monster.speed_min) * porcentagem) / 100) + parseInt(monster.speed_min)
            let dinheiro = parseInt(monster.dinheiro)
            let retorno = {
                nome: monster.name,
                image: monster.image,
                level: lvl,
                vida: vida,
                xp: xp,
                ataque: ataque,
                defesa: defesa,
                speed: speed,
                dinheiro: dinheiro,
                dano: 0
            }
            return retorno;
        } catch (err) {
            console.log(err);
            return 'erro';
        }
    },
    huntbatle: function (monster, personagem, user, msg, dano) {
        if (monster.speed > personagem.speed) {
            let m_dano = Math.floor(monster.ataque * 0.75)
            personagem.v_atual = (personagem.v_atual - m_dano) < 0 ? 0 : (personagem.v_atual - m_dano)
            monster.dano = parseInt(m_dano + monster.dano)
            if (personagem.v_atual < 1) {
                this.morreu(user, msg, monster)
                return;
            } else {
                let p_dano;
                if (!db.fetch(`rpg.characters.players.${user.id}.inventario.espada`)) {
                    p_dano = Math.floor(personagem.ataque * 0.80)
                } else {
                    p_dano = Math.floor(personagem.ataque * 0.80) + parseInt(personagem.inventario.espada.dano)
                }
                monster.vida = monster.vida - p_dano
                if (monster.vida < 1) {
                    this.matou(user, monster, msg)
                    return;
                } else {
                    this.huntbatle(monster, personagem, user, msg, dano)
                }
            }
        } else {
            let p_dano;
            if (!db.fetch(`rpg.characters.players.${user.id}.inventario.espada`)) {
                p_dano = Math.floor(personagem.ataque * 0.80)
            } else {
                p_dano = Math.floor(personagem.ataque * 0.80) + parseInt(personagem.inventario.espada.dano)
            }
            monster.vida = monster.vida - p_dano

            if (monster.vida < 1) {
                console.log('matei')
                this.matou(user, monster, msg)
                return;
            } else {
                let m_dano = Math.floor(monster.ataque * 0.75)
                personagem.v_atual = (personagem.v_atual - m_dano) < 0 ? 0 : (personagem.v_atual - m_dano)
                monster.dano = parseInt(m_dano + monster.dano)

                if (personagem.v_atual < 1) {
                    this.morreu(user, msg, monster)
                    return;
                } else {
                    this.huntbatle(monster, personagem, user, msg, dano)
                }
            }
        }
    },
    matou: function (user, monster, msg) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Fim da Batalha!!')
            .setColor(config.COLOR)
            .setDescription(`${user} Acaba de derrotar um(a) ${monster.nome} !! \n **Recebendo:**`)
            .addFields(
                { name: 'XP', value: `${monster.xp}`, inline: true },
                { name: 'Money', value: `${monster.dinheiro}`, inline: true },
                { name: 'DANO', value: `${monster.dano}`, inline: true }
            )
            .setFooter(`O comando entrou em cooldown!! >w<`)
            .setThumbnail(monster.image)
        msg.channel.send(embed)
        db.add(`rpg.characters.players.${user.id}.balance`, monster.dinheiro)
        db.subtract(`rpg.characters.players.${user.id}.v_atual`, monster.dano)
        db.add(`rpg.characters.players.${user.id}.xp`, monster.xp)
        let d_atual = new moment()
        db.set(`rpg.characters.players.${user.id}.cooldowns.hunt`, d_atual)
    },
    morreu: function (user, msg, monster) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Fim da Batalha!!')
            .setColor(config.COLOR)
            .setDescription(`${user} Acaba de ser derrotado por um(a) ${monster.nome} !!`)
            .setFooter(`O comando entrou em cooldown!! >w<`)
            .setThumbnail(monster.image)
        msg.channel.send(embed)
        db.set(`rpg.characters.players.${user.id}.v_atual`, 0)
        let d_atual = new moment()
        db.set(`rpg.characters.players.${user.id}.cooldowns.hunt`, d_atual)
    },
    huntleave: function (monster, personagem, user, msg) {
        if (monster.speed > personagem.speed) {
            let dano = Math.floor(monster.ataque / 2)
            let vida = (personagem.v_atual - dano) < 0 ? 0 : personagem.v_atual - dano
            let embed = new Discord.MessageEmbed()
                .setDescription(`Você sai correndo o mais rapido possivel porem o(a) \n **${monster.nome}** é mais rapido doque você e acaba te acertando!!`)
                .setColor(config.COLOR)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Dano', value: `${(dano)}`, inline: true },
                    { name: 'Vida', value: `${vida}`, inline: true }
                )
                .setFooter(`O comando entrou em cooldown!! >w<`)
            let d_atual = new moment()
            msg.channel.send(embed)
            db.set(`rpg.characters.players.${user.id}.cooldowns.hunt`, d_atual)
            db.subtract(`rpg.characters.players.${user.id}.v_atual`, dano)
        } else {
            let embed = new Discord.MessageEmbed()
                .setDescription(`Você sai correndo o mais rapido possivel e consegue fugir do(a) **${monster.nome}**!!`)
                .setColor(config.COLOR)
                .addFields(
                    { name: 'Sua Speed', value: `${personagem.speed}`, inline: true },
                    { name: `${monster.nome} Speed`, value: `${monster.speed}`, inline: true }
                )
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setFooter(`O comando entrou em cooldown!! >w<`)
            let d_atual = new moment()
            msg.channel.send(embed)
            db.set(`rpg.characters.players.${user.id}.cooldowns.hunt`, d_atual)
        }
    },
    radioplay: function (voiceChannel, message, client, link, name) {
        voiceChannel.join().then(connection => {
            connectionDispatcher = connection.play(link);
            return message.channel.send(`Tocando agora: \`${name}\`!!`);
        });
    },
    radiostop: function (voiceChannel, message, client) {
        if (connectionDispatcher) {
            connectionDispatcher.end();
            voiceChannel.leave();
            return message.channel.send("Parando a rádio!!");
        }
    },
    radiopause: function (voiceChannel, message, client) {
        if (connectionDispatcher) {
            if (connectionDispatcher) {
                connectionDispatcher.end();
                return message.channel.send("Pausado!!");
            }
        }
    },
    radioadd: function (link, name, description) {
        if (db.fetch(`radio.count`)) {
            let count = db.get(`radio.count`)
            count += 1
            db.set(`radio.links.${count}`, { l: link, n: name, d: description, c: count })
            db.add(`radio.count`, 1)
        } else {
            db.set(`radio.count`, 1)
            let count = 1
            db.set(`radio.links.${count}`, { l: link, n: name, d: description, c: count })
        }
    }
}