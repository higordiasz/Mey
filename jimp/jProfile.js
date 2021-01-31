const jimp = require('jimp')
const Discord = require('discord.js')
const Jimp = require('jimp');
const { DIF } = require('../json/config.json')

module.exports = {
    profile: async function (client, msg, val, user) {
        try {
            let fundo
            let font = await Jimp.loadFont('./font/pixelart.fnt')
            switch (val.fundo) {
                case 'azul':
                    fundo = await jimp.read('./img/maleprofile.jpg')
                    break;
                case 'rosa':
                    fundo = await jimp.read('./img/femaleprofile.jpg')
                    break;
                default:
                    fundo = await jimp.read('./img/maleprofile.jpg')
                    break;
            }
            let point = await jimp.read('./img/point.png')
            let vida = Math.floor(((parseInt(val.vida_a) * 100) / val.vida_m) / 10)
            let positions = [290, 300, 310, 320, 330, 340, 350, 360, 370, 380]
            point.resize(7, 9)
            for (let i = 0; i < vida; i++) {
                fundo.composite(point, positions[i], 91)
            }
            await Jimp.read(user.displayAvatarURL({ format: 'png' })).then(avatar => {
                avatar.resize(156, 156)
                fundo.print(font, 30, 195, user.username.substring(0, 7))
                //fundo.print(font_v, 300, 80, `${val.vida_a} - ${val.vida_m}`)
                fundo.print(font, 215, 18, 'Level')
                fundo.print(font, 385, 18, val.level)
                fundo.print(font, 215, 220, 'Defesa')
                fundo.print(font, 215, 185, 'Speed')
                fundo.print(font, 215, 150, 'Magia')
                fundo.print(font, 215, 115, 'Ataque')
                fundo.print(font, 385, 115, val.ataque)
                fundo.print(font, 385, 150, val.magia)
                fundo.print(font, 385, 185, val.speed)
                fundo.print(font, 385, 220, val.defesa)
                fundo.composite(avatar, 30, 30)
                fundo.write(`./img/${msg.guild.id}/${user.id}.png`)
            })
            let arq = new Discord.MessageAttachment(`./img/${msg.guild.id}/${user.id}.png`)
            msg.channel.send(`${msg.author}`, arq)
        } catch (err) {
            console.log(err)
        }
    },
    level: async function (client, msg, level, xp, user) {
        try {
            let atual = Math.trunc(((level + 1) / parseFloat(DIF)) * ((level + 1) / parseFloat(DIF)))
            let anterior = level > 1 ? Math.trunc((level / parseFloat(DIF)) * (level / parseFloat(DIF))) : 0
            let xp_atual = xp - anterior
            let xp_next = atual - anterior
            let porcent = Math.floor(((parseInt(xp_atual) * 100) / xp_next) / 10)
            //console.log(`Anterior: ${anterior} | Atual: ${atual} | XP_ATUAL: ${xp_atual} | XP_NEXT: ${xp_next} | Porcent: ${porcent}`)
            let fundo = await jimp.read('./img/Level.jpg')
            let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
            let font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
            let point = await jimp.read('./img/point.png')
            let positions = [190, 225, 260, 295, 330, 365, 400, 435, 470, 505]
            point.resize(34, 37)
            if (porcent > 10) porcent = 10;
            for (let i = 0; i < porcent; i++) {
                fundo.composite(point, positions[i], 120)
            }
            await Jimp.read(user.displayAvatarURL({ format: 'png' })).then(avatar => {
                avatar.resize(156, 156)
                fundo.print(font, 175, 10, `${user.tag}`)
                fundo.print(font, 175, 70, `Level: `)
                fundo.print(font, 265, 70, `${level}`)
                fundo.print(font2, 450, 90, `${xp} / ${atual}`)
                fundo.composite(avatar, 10, 10)
                fundo.write(`./img/${msg.guild.id}/${user.id}level.png`)
            })
            let arq = new Discord.MessageAttachment(`./img/${msg.guild.id}/${user.id}level.png`)
            msg.channel.send(`${msg.author}`, arq)
        } catch (err) {
            console.log(err)
        }
    },
    rank: async function (client, msg, pri, seg, ter, qua, qui, m) {
        let fundo = await jimp.read('./img/rank.jpg')
        let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
        let font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
        let avatar1 = await Jimp.read(pri.avatar)
        let avatar3 = await Jimp.read(ter.avatar)
        let avatar2 = await Jimp.read(seg.avatar)
        let avatar4 = await Jimp.read(qua.avatar)
        let avatar5 = await Jimp.read(qui.avatar)
        avatar1.resize(156, 156)
        avatar2.resize(156, 156)
        avatar3.resize(156, 156)
        avatar4.resize(156, 156)
        avatar5.resize(156, 156)
        fundo.composite(avatar1, 10, 10)
        fundo.composite(avatar2, 10, 185)
        fundo.composite(avatar3, 10, 364)
        fundo.composite(avatar4, 10, 543)
        fundo.composite(avatar5, 10, 720)
        fundo.print(font, 175, 10, pri.tag)
        fundo.print(font, 175, 185, seg.tag)
        fundo.print(font, 175, 364, ter.tag)
        fundo.print(font, 175, 543, qua.tag)
        fundo.print(font, 175, 720, qui.tag)
        fundo.print(font, 175, 50, `Level: ${pri.level}`)
        fundo.print(font, 175, 225, `Level: ${seg.level}`)
        fundo.print(font, 175, 404, `Level: ${ter.level}`)
        fundo.print(font, 175, 583, `Level: ${qua.level}`)
        fundo.print(font, 175, 760, `Level: ${qui.level}`)
        fundo.print(font, 175, 95, `Xp: ${pri.xp}`)
        fundo.print(font, 175, 270, `Xp: ${seg.xp}`)
        fundo.print(font, 175, 449, `Xp: ${ter.xp}`)
        fundo.print(font, 175, 628, `Xp: ${qua.xp}`)
        fundo.print(font, 175, 805, `Xp: ${qui.xp}`)
        fundo.write(`./img/${msg.guild.id}/rank.png`)
        let arq = new Discord.MessageAttachment(`./img/${msg.guild.id}/rank.png`)
        m.delete()
        msg.channel.send(`${msg.author}`, arq)
    }
}